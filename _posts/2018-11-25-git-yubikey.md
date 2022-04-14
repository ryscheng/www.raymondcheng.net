---
layout: post
title:  "Signing Git Commits and SSH Authentication with Yubikey"
date:   2018-11-25 12:47:18 -0700
categories: projects
tags: popular
---

In this blog post, I'll show you how to setup a Yubikey with both signing and authentication keys.
As a driving example, I'll describe how to use a Yubikey to sign your git commits and
authenticate via SSH with [GitHub](https://github.com).
Of course you can reuse this guide to authenticate with any other SSH server as well.

**Why use Yubikeys?**  
These devices store private key material in a way that cannot be copied from the device.
An attacker would need to steal the physical device to use your keys.
This setup is in contrast to keys stored on your local hard drive,
which can be easily copied by any program running on your computer.

**Overview**  
Yubikeys store GPG keys. We will first generate keys on the device.
Then your computer needs to be configured with `gpg-agent`,
which will manage access to the keys. `git` and `ssh` can then be configured to consult
the `gpg-agent` for signing commits and SSH authentication by default (instead of `ssh-agent`).

**New machines**  
If you have already generated the keys on your Yubikey and just want to setup 
your computer to use it, skip to the [gpg-agent configuration section](#gpg-agent-configuration)

*Credits: This guide was adapted from this great [post](https://www.isi.edu/~calvin/yubikeyssh.htm) by [Calvin Ardi](https://www.isi.edu/~calvin/)*

---
## Table of Contents
- [Install tools](#install-tools)
- [Yubikey configuration](#yubikey-configuration)
- [Generate your keys](#generate-your-keys)
- [gpg-agent configuration](#gpg-agent-configuration)
- [Signed git commits](#signed-git-commits)
- [SSH Authentication](#ssh-authentication)

---

## Install Tools

You will need the following tools on your system:
- [gpg 2.x](https://gnupg.org/) and gpg-agent
- [Yubikey personalization tool](https://www.yubico.com/products/services-software/download/yubikey-personalization-tools/)

To install these on Ubuntu 18.04:
```bash
$ sudo add-apt-repository ppa:yubico/stable
$ sudo apt-get update
$ sudo apt-get install pcscd scdaemon pcsc-tools gnupg2 gnupg-agent
$ sudo apt-get install yubikey-manager yubikey-personalization-gui yubikey-personalization
```

To install these on MacOS with [Homebrew](https://brew.sh/)
```bash
$ brew install gnupg2
$ brew install pinentry-mac
$ brew install ykman
$ brew install yubikey-personalization
```

To install these on MacOS with [MacPorts](https://www.macports.org/)
```bash
$ sudo port install gnupg2 pinentry-mac yubikey-manager ykpers
```

## Yubikey Configuration

First make sure that the Yubikey is plugged in and check that `gpg` can see it.
If you can't see the card, you're probably missing some smart card driver for your system.
You probably don't need to restart your computer, but that could also be worth a shot.

```bash
$ gpg --card-status
Reader ...........: Yubico Yubikey XXX
Application ID ...: XXXXX
Version ..........: X.X
Manufacturer .....: Yubico
Serial number ....: XXXXX
Name of cardholder: [not set]
Language prefs ...: [not set]
Sex ..............: unspecified
URL of public key : [not set]
Login data .......: [not set]
Signature PIN ....: forced
Key attributes ...: rsa4096 rsa4096 rsa4096
Max. PIN lengths .: 127 127 127
PIN retry counter : 3 3 3
Signature counter : 0
Signature key ....: [none]
Encryption key....: [none]
Authentication key: [none]
General key info..: [none]
````

Now we will change the key size, PIN, and Admin PIN on the device from its defaults.
In this guide we will use RSA4096, but you should choose the configuration that works best for you.
The default PIN and Admin PIN values for Yubikeys are 123456 and 12345678 respectively.

Note: If you incorrectly enter your Admin PIN three times,
you will be locked out of your Yubikey and it will be useless.
If that happens, check out the [factory reset instructions](https://support.yubico.com/hc/en-us/articles/360013707640-Resetting-Your-YubiKey-4-or-YubiKey-NEO-to-Factory-Defaults).

```bash
$ gpg --card-edit

gpg/card> admin
Admin commands are allowed

gpg/card> key-attr
Changing card key attribute for: Signature key
Please select what kind of key you want:
  (1) RSA
  (2) ECC
Your selection? 1
What keysize do you want? (4096) 4096
Changing card key attribute for: Encryption key
Please select what kind of key you want:
  (1) RSA
  (2) ECC
Your selection? 1
What keysize do you want? (4096) 4096
Changing card key attribute for: Authentication key
Please select what kind of key you want:
  (1) RSA
  (2) ECC
Your selection? 1
What keysize do you want? (4096) 4096

gpg/card> passwd
gpg: OpenPGP card no. XXXXXX detected

1 - change PIN
2 - unblock PIN
3 - change Admin PIN
4 - set the Reset Code
Q - quit

Your selection? 3
PIN changed.
...
Your selection? 1
PIN changed.
...
Your selection? q

gpg/card> quit
```

Now let's set the Yubikey mode to U2F/CCID composite mode.
U2F mode is used for 2-factor authentication for web services like Google/GitHub.
CCID mode is used for `gpg` operations.
We will disable OTP mode to avoid the annoying keyboard behavior when the button is accidentally pressed.
Note that mode 5 is specific to Yubikey 3.0 and above
([details](https://developers.yubico.com/yubikey-personalization/Manuals/ykpersonalize.1.html)).
Make sure you're setting the correct mode for your Yubikey.

```bash
$ ykpersonalize -m 5
Firmware version X.X.X Touch level XXX Program sequence X

The USB mode will be set to: 0x5

Commit? (y/n) [n]: y
WARNING: Changing mode will require you to use another tool (ykneomgr or u2f-host) to switch back if OTP mode is disabled, really commit? (y/n) [n]: y
```

Now disconnect and reconnect your Yubikey to apply the new settings.
You'll notice that pushing the Yubikey button no longer leads to keyboard strokes.

***Optional***: It is also recommended to enable a touch requirement for all authentication requests,
which means you have the physically touch the device to approve any encryption/signing/authentication requests.
For details, see [here](https://support.yubico.com/hc/en-us/articles/360016614940-YubiKey-Manager-CLI-ykman-User-Manual).

```bash
$ ykman openpgp touch aut on
$ ykman openpgp touch enc on
$ ykman openpgp touch sig on
```

## Generate Your Keys

Now let's have the Yubikey generate its own keys.
This way, we can be sure the keys never existed outside the device.

**Note: The email address that you enter here MUST match the one verified on your GitHub account!**
Otherwise, the GitHub UI will show your commits as "unverified".

```bash
$ gpg --card-edit

gpg/card> admin
Admin commands are allowed

gpg/card> generate
Make off-card backup of encryption key? (Y/n) n

Please specify how long the key should be valid.
  0 = key does not expire
  <n>  = key expires in n days
  <n>w = key expires in n weeks
  <n>m = key expires in n months
  <n>y = key expires in n years
Key is valid for? (0) 0
Key does not expire at all
Is this correct? (y/N) y

GnuPG needs to construct a user ID to identify your key.

Real name: <Enter your name>
Email address: <Enter your email address>
Comment:
You selected this USER-ID:
"XXX XXX <XXXXX>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? o
gpg: key XXX marked as ultimately trusted
```

This step may take several minutes as the device generates keys with sufficient entropy.
It will generate unique subkeys for signatures, encryption, and authentication.

Now verify that you have keys on the card. Look for a `Signature key`, `Encryption key`, and `Authentication key`.
In particular make note of your signature key fingerprint:
```bash
$ gpg --card-status
Reader ...........: Yubico Yubikey XXX
Application ID ...: XXXXX
Version ..........: X.X
Manufacturer .....: Yubico
Serial number ....: XXXXX
Name of cardholder: [not set]
Language prefs ...: [not set]
Sex ..............: unspecified
URL of public key : [not set]
Login data .......: [not set]
Signature PIN ....: forced
Key attributes ...: rsa4096 rsa4096 rsa4096
Max. PIN lengths .: 127 127 127
PIN retry counter : 3 3 3
Signature counter : 0
Signature key ....: XXXX XXXX XXXX XXXX XXXX  XXXX XXXX XXXX XXXX XXXX
  created ....: 2018-01-01 00:00:00
Encryption key....: XXXX XXXX XXXX XXXX XXXX  XXXX XXXX XXXX XXXX XXXX
  created ....: 2018-01-01 00:00:00
Authentication key: XXXX XXXX XXXX XXXX XXXX  XXXX XXXX XXXX XXXX XXXX
  created ....: 2018-01-01 00:00:00
General key info..: pub  rsa4096/XXXXXXXXXXXXXXXX 2018-01-01 NAME <EMAIL>
sec>  rsa4096/XXXXXXXXXXXXXXXX  created: 2018-01-01  expires: never  <=== THIS ONE
                                card-no: 0000 00000000
ssb>  rsa4096/XXXXXXXXXXXXXXXX  created: 2018-01-01  expires: never
                                card-no: 0000 00000000
ssb>  rsa4096/XXXXXXXXXXXXXXXX  created: 2018-01-01  expires: never
                                card-no: 0000 00000000
```

Make a note of your `SIGNATURE_KEY_FINGERPRINT`.
Then export your signature public key.
For example, if your fingerprint is AED9256FF8CEC558:
```bash
$ gpg --armor --export AED9256FF8CEC558 > AED9256FF8CEC558.asc
```

You will need to manually copy this signature public key to any computer that you want
to use for git commit signing.

## gpg-agent Configuration

First, you need to import your signature public key onto the machine.
You can skip this if you generated the key on this computer.
For example, if your signature public key is in `AED9256FF8CEC558.asc`:
```bash
$ gpg --import < AED9256FF8CEC558.asc
```

Then, `gpg-agent` needs to be configured with SSH support.
Put the following in your `~/.gnupg/gpg-agent.conf`:
```
# if on MacOS, we recommend you use pinentry-mac
# otherwise, look for `pinentry' on your system (e.g. pinentry-gnome3 or pinentry-tty).
# If you don't set this, the default pinentry will be used
pinentry-program /usr/local/bin/pinentry-mac

# enables SSH support (ssh-agent)
enable-ssh-support
```

To setup your terminal to use `gpg-agent` as your SSH agent,
put the following in your `~/.bashrc` or `~/.bash_profile`:
```
export SSH_AUTH_SOCK=`gpgconf --list-dirs agent-ssh-socket`
export GPG_TTY=$(tty)
```

Remember to restart your gpg-agent and terminal for these settings to take effect.
If you don't have gpg-agent setup to run automatically, you can start it manually:
```bash
$ gpg-agent --daemon --enable-ssh-support
```

## Signed git Commits
You can manually ask git to sign at commit time.
To do so, you need to remember to add the `-S` flag every time you commit.
```bash
$ git commit -S -m 'commit message'
```

*Note: Whenever the Yubikey is asked to sign or authenticate,
you'll need to enter your PIN into the `pinentry` program.
If you configured a touch requirement, you'll also need to touch the Yubikey.*

#### Automatically Signing Commits by Default
In order to have git automatically sign all commits for you (without the `-S` flag),
add this to your `~/.gitconfig`.
Your signing key fingerprint is from the last step of the [generate your keys section](#generate-your-keys).

```
[user]
  signingkey = <fingerprint>
[commit]
  gpgsign = true
```

#### Upload GPG Keys to GitHub
Now add your GPG signature public key to GitHub.  
[https://github.com/settings/keys](https://github.com/settings/keys)

We previously exported it to a file at the end of the [generate your keys section](#generate-your-keys).
From any computer where the public key is already loaded,
you can get it again by running:
```bash
$ gpg --armor --export SIGNATURE_KEY_FINGERPRINT
```

After you do this,
GitHub will [verify your commits](https://help.github.com/articles/adding-a-new-gpg-key-to-your-github-account/)
and show a verified status in commit history.

#### Checking Signatures
After you've signed your first commit, you will see verified commits
in the commit log both locally and on GitHub.
```bash
$ git log --show-signature
Author: NAME <EMAIL>
Date:  Mon Jan 01 00:00:00 2018 -0000

  commit message

commit xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
gpg: Signature made Mon Jan 01 00:00:00 2018 PST
gpg:                using RSA key XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
gpg: Good signature from "NAME <EMAIL>" [unknown]
Primary key fingerprint: XXXX XXXX XXXX XXXX XXXX  XXXX XXXX XXXX XXXX XXXX
```

## SSH Authentication

#### Get Your SSH Public Key

When the Yubikey is plugged in, `gpg-agent` is properly running, 
and your terminal is setup with the correct `SSH_AUTH_SOCK`,
you can get your SSH public key by running:
```bash
$ ssh-add -L
```

If you want to get it directly from GPG, you can run the following with
the authentication key fingerprint:
```bash
$ gpg --export-ssh-key AUTHENTICATION_KEY_FINGERPRINT
```

#### Add Your Key to a Remote Server
With that SSH key, you can now add it as an authorized key to any SSH server.

To tell GitHub about this key, add the SSH key here:   
[https://github.com/settings/keys](https://github.com/settings/keys)

You can also add it to any SSH server by adding it to `~/.ssh/authorized_keys`.

#### Test Out SSH
You should now be able to SSH to servers.
Whenever the Yubikey is asked to sign or authenticate,
you'll need to enter your PIN into the `pinentry` program.
If you configured a touch requirement, you'll also need to touch the Yubikey.

Try it out with the `-v` flag on `ssh` to see if the right key is being used:
```bash
$ ssh -v example.com
OpenSSH_6.7p1, OpenSSL 1.0.2 22 Jan 2015
debug1: Connecting to example.com [127.0.0.1] port 22.
debug1: Connection established.
debug1: Enabling compatibility mode for protocol 2.0
debug1: Local version string SSH-2.0-OpenSSH_6.7
debug1: Remote protocol version 2.0, remote software version OpenSSH_6.4
debug1: match: OpenSSH_6.4 pat OpenSSH* compat 0x04000000
debug1: SSH2_MSG_KEXINIT sent
debug1: SSH2_MSG_KEXINIT received
debug1: kex: server->client aes128-ctr umac-64-etm@openssh.com none
debug1: kex: client->server aes128-ctr umac-64-etm@openssh.com none
debug1: sending SSH2_MSG_KEX_ECDH_INIT
debug1: expecting SSH2_MSG_KEX_ECDH_REPLY
debug1: Server host key: RSA xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx
debug1: Host 'example.com' is known and matches the RSA host key.
debug1: SSH2_MSG_NEWKEYS sent
debug1: expecting SSH2_MSG_NEWKEYS
debug1: SSH2_MSG_NEWKEYS received
debug1: Roaming not allowed by server
debug1: SSH2_MSG_SERVICE_REQUEST sent
debug1: SSH2_MSG_SERVICE_ACCEPT received
debug1: Authentications that can continue: publickey,gssapi-keyex,gssapi-with-mic
debug1: Next authentication method: publickey
# this is where we see our YubiKey is being used
debug1: Offering RSA public key: cardno:XXXXXXXXXXXX
debug1: Server accepts key: pkalg ssh-rsa blen 279
debug1: Authentication succeeded (publickey).
Authenticated to localhost ([127.0.0.1]:22).
debug1: channel 0: new [client-session]
debug1: Requesting no-more-sessions@openssh.com
debug1: Entering interactive session.
[user@localhost]~$
```

#### Using Your Yubikey on a Chromebook
If you've provisioned your Yubikey on another machine, it is possible to use it for SSH authentication on a Chromebook.
First, make sure you've installed the following Chrome Apps:
- [SSH](https://chrome.google.com/webstore/detail/secure-shell-app/pnhechapfaindjhompbnflcldabbghjo)
- [Smart Card Connector](https://chrome.google.com/webstore/detail/smart-card-connector/khpfeaanjngmcnplbdlpegiifgpfgdco)

Because Crostini (the project that brings a Debian VM to Chromebooks) does not currently support natively accessing the Yubikey through USB, you have to SSH into your Linux VM with agent-forwarding. That way, the SSH agent running in the Smart Card Connector will be accessible to the VM, which you use to authenticate from within the VM.
Crostini is [not available on all Chromebooks](https://chromium.googlesource.com/chromiumos/docs/+/master/containers_and_vms.md#supported).
Follow this [guide](https://blog.merzlabs.com/posts/yubikey-crostini/) to set up SSH and agent forwarding.
If you have any issues, here's a [reference doc](https://chromium.googlesource.com/apps/libapps/+/HEAD/nassh/doc/hardware-keys.md).

## Wrapping Up
That's pretty much it!

While not technically part of this guide, it's usually a good idea to set
up your Yubikey as a security key for two-factor authentication.

**Setup your GitHub two-factor authentication here:**   
[https://github.com/settings/two_factor_authentication/configure](https://github.com/settings/two_factor_authentication/configure)

If you have any trouble, check out the troubleshooting section in this
[guide](https://www.isi.edu/~calvin/yubikeyssh.htm).

If you ever lose your Yubikey, remember to remove it as an authorized key on
GitHub and any SSH servers you may be using.

