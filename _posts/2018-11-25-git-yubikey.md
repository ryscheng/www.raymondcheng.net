---
layout: post
title:  "Signing Git Commits and SSH Authentication with Yubikey"
date:   2018-11-25 12:47:18 -0700
categories: projects
---

In this blog post, I'll show you how to setup a Yubikey with both signing and authentication keys.
As a driving example, I'll describe how to use a Yubikey to sign your git commits and
authenticate via SSH with [GitHub](https://github.com).
Of course you can reuse this guide to authenticate with any other SSH server as well.

**Why use Yubikeys?**  
These devices store private key material in a way that cannot be copied from the device.
An attacker would need to steal the physical device to use your keys.
This is contrast to keys stored on your local hard drive,
which can be easily copied by any program running on your computer.

**Overview**  
Yubikeys store GPG keys. We will first generate keys on the device.
Then your computer needs to be configured with `gpg-agent`,
will manage the keys. `git` and `ssh` can then be configured to consult
the `gpg-agent` for signing commits and SSH authentication by default (instead of `ssh-agent`).

**New machines**  
If you have already generated the keys on your Yubikey and just want to setup 
your computer to use it, skip to ["Setup gpg-agent"](#setup-gpg-agent)

---
## Table of Contents
- [Install tools](#install-tools)
- [Configure the Yubikey](#configure-the-yubikey)
- [Generate Keys](#generate-keys)
- [Setup gpg-agent](#setup-gpg-agent)
- [Configure git](#configure-git)
- [Configure GitHub](#configure-github)

---

## Install Tools

You will need the following tools on your system:
- [gpg 2.x](https://gnupg.org/) and gpg-agent
- [Yubikey personalization tool](https://www.yubico.com/products/services-software/download/yubikey-personalization-tools/)

To install these on Ubuntu 18.04:
```bash
$ sudo apt-get repository ppa:yubico/stable
$ sudo apt-get update
$ sudo apt-get install yubikey-personalization-gui yubikey-neo-manager yubikey-personalization
$ sudo apt-get install pcscd scdaemon pcsc-tools gnupg2 gnupg-agent
```

To install these on MacOS with [Homebrew](https://brew.sh/)
```bash
$ brew install yubikey-personalization
$ brew install gnupg2
$ brew install gpg-agent
$ brew install pinentry-mac
```

## Configure the Yubikey

First make sure that the Yubikey is plugged in and check that `gpg` can see it
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
The default PIN and Admin PIN values are 123456 and 12345678 respectively.

Note: If you incorrectly enter your Admin PIN three times,
you will be locked out of your Yubikey and it will be useless.
Check out the [factory reset instructions](https://support.yubico.com/support/solutions/articles/15000008845-resetting-your-yubikey-4-or-yubikey-neo-to-factory-defaults).

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
CCID mode is used for gpg operations.
We will disable OTP mode to avoid the annoying keyboard behavior when the button is accidentally pressed.
Note that mode 5 is specific to Yubikey 3.0 and above
([details](https://developers.yubico.com/yubikey-personalization/Manuals/ykpersonalize.1.html)).
Make sure you're setting the correct mode for your Yubikey.

```bash
ykpersonalize -m 5
Firmware version X.X.X Touch level XXX Program sequence X

The USB mode will be set to: 0x5

Commit? (y/n) [n]: y
WARNING: Changing mode will require you to use another tool (ykneomgr or u2f-host) to switch back if OTP mode is disabled, really commit? (y/n) [n]: y
```

Now disconnect and reconnect your Yubikey to reset.
You'll notice that pushing the Yubikey button no longer leads to keyboard strokes.

It is also recommended to enable a touch requirement for all authentication requests,
which means you have the physically touch the device to approve these requests.
See [here](https://gist.github.com/a-dma/797e4fa2ac4b5c9024cc)
for a bash script that will enable this requirement for Yubikey 4.

## Generate Keys

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
General key info..: pub  rsa4096/E75C7AE71312EF23 2018-12-20 Raymond Cheng <me@raymondcheng.net>
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

## Setup gpg-agent

First, you need to import your signature public key onto the machine.
You can skip this if you generated the key on this computer.
For example, if you signature public key is in `AED9256FF8CEC558.asc`:
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

## Configure git
In order to have git automatically sign all commits for you,
add this to your `~/.gitconfig`.
Your signing key fingerprint is from the last step of ["Generating Keys"](#generating-keys).

```
[user]
  signingkey = <fingerprint>
[commit]
  gpgsign = true
```

## Configure GitHub

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

With that SSH key, you can now add it as an authorized to any SSH server
(e.g. via `~/.ssh/authorized_keys`).

You can add the SSH key to GitHub here:  
[https://github.com/settings/keys](https://github.com/settings/keys)

You should also add your GPG signature public key.
We previously exported it to a file at the end of ["Generating Keys"](#generating-keys).
From any computer where the public key is already loaded,
you can get it again by running:
```bash
$ gpg --armor --export SIGNATURE_KEY_FINGERPRINT
```

Don't forget to set up your Yubikey as a 2-factor authentication "security key":  
[https://github.com/settings/two_factor_authentication/configure](https://github.com/settings/two_factor_authentication/configure)


## Wrapping Up
That's pretty much it!

If you have any trouble, check out the troubleshooting section in this
[guide](https://www.isi.edu/~calvin/yubikeyssh.htm).
Shout out to Calvin for making an awesome guide.

If you ever lose your Yubikey, remember to remove it as an authorized key on
GitHub and any SSH servers you may be using.

