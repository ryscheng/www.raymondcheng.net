---
layout: post
title:  "Retrospective: Solar Printer"
date:   2015-11-14 14:23:18 -0700
categories: posts 
tags: [projects, hardware]
---

One of my first projects at MIT was at the Media Lab, where we were exploring self-sufficient technologies. My advisor, Richard Fletcher, and I wanted to build a completely self-sufficient printer for use in developing countries.

### Low-cost reusable materials
Existing printers use an excessive amount of consumables, from paper, to toner, to grid electricity. Recent advances in reversible forms of organic photochromic compounds enabled us to explore a different part of the design space. These chemicals change color depending on the wavelength of light it is exposed to.

### How? Focus UV onto photochromic paper
The printer uses a motorized chassis, which moves over a sheet of photochromic paper. It controls exposure to UV light through a stencil, effectively imprinting characters onto the sheet. By using low-power DC motors and an MSP430, we were able to keep power consumption to less than 0.4 watts, sourced by a solar panel.

<iframe width="420" height="315" src="https://www.youtube.com/embed/yzVeC9tzkVU" frameborder="0" allowfullscreen></iframe>

This was such an incredible experience for an incoming freshman who had no experience with a machine room, microcontrollers, C programming, or embedded devices. Thank you, Dr. Fletcher, for your patience and guidance!
