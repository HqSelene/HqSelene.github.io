---
title: Emotion “Clock”
category: Critical Design
year: "2023"
featured: true
intro: Making collective interpretation visible.
summary: A participatory museum system that lets visitors build and see a shared understanding of an exhibit in real time.
tags:
  - Interaction design
  - Participatory systems
  - Physical computing
cover: /media/emotion-clock/cover.jpg
role: Interaction designer · System designer
tools: App + hardware integration · Data visualization
order: 4
draft: false
sectionLabels:
  A clock for accumulated perception: Concept
  The audience becomes part of the exhibition: Design
---

## Overview

Humans created time as a shared abstraction, a collective agreement that allows society to function. The clock materializes this invisible consensus, making an intangible concept measurable and visible.

In this project, I explore a similar idea: *What if knowledge and interpretation within an exhibition space could also become visible through consensus?*

I designed an interactive system where visitors collectively construct a shared understanding of exhibits. The panel functions as a “clock”, not for time, but for accumulated perception.

### System Design

The project consists of:

1. A mobile application interface for visitor input
2. A physical interactive panel (custom hardware) installed in the exhibition space
3. A real-time aggregation system that translates individual responses into collective visualization

Visitors interact with the exhibit through the app, submitting interpretations, emotional reactions, or evaluations. These inputs are processed and dynamically reflected on the physical panel.

Over time, the panel becomes a living visualization of consensus showing an evolving index of collective perception.

### “Clock” System Design

#### Emotion Clock

![](/media/emotion-clock/clock.png)

This is the visualization of a similarity matrix, which functioned as a clock to show visitors’ attitudes toward other exhibits. It involves the mutual similarity of $x$ interactive visitors. The latest interactive visitors are set to default and displayed to the visitor. Since the current interactive visitor is the latest visitor to interact with the panel, column $n$ and row $n$ show similarities between this visitor and former $x$ visitors.

#### Clock Installation

![](/media/emotion-clock/device-03.png)

This panel installation is used to show the similarity matrix.

#### Data Workflow

This process depicts a detailed process related to data, from data collection to data computation. Expressly, the data storage and computation environment is set on the cloud. The data computation is based on Python, with different libraries in different tasks.  

![](/media/emotion-clock/data-workflow.png)

> The emotion analysis is based on the color wheel theory. Robert Plutchik, a psychologist, proposed the psychoevolutionary classification approach for general emotional responses and created a wheel of emotions to illustrate different emotions.
>
> 

![](/media/emotion-clock/color-wheel.png)

#### App Design

![](/media/emotion-clock/device.png)
![](/media/emotion-clock/device-02.png)

### Experience Map

![](/media/emotion-clock/journey.png)

### More Than Museums

The pattern proposed in this project above is not only suitable for different types of museums, such as art museums, history museums, science museums, etc., but also can be adapted to other places where knowledge sharing can take place, for instance, relics, building, school, or even the supermarkets.

## Design notes

### A clock for accumulated perception

A clock turns an invisible social agreement—time—into something measurable. This project asks whether knowledge and interpretation inside an exhibition can become visible in a similar way.

Visitors respond to prompts as they move through the museum. Their individual perspectives are aggregated into a shared visualization that changes with every contribution.

### The audience becomes part of the exhibition

The system combines a visitor interface, a physical display panel, and a real-time aggregation layer. Instead of delivering a single authoritative reading, the museum reveals how different readings coexist.

The model can extend beyond museums to schools, public buildings, heritage sites, and other places where knowledge is negotiated collectively.

![Museum](/media/emotion-clock/museum.png)

### From Museum 4.X to a shared interface

Presented as **Museum 4.X** in the portfolio, the project considers a museum as both a physical boundary and a boundary around knowledge. A collection is not only a set of objects: the institution also decides which interpretations become visible. The proposed system opens that interpretive process to visitors.

The mobile interface lets visitors find nearby installations, follow branches of an exhibit, and leave responses through words, emotion colors, and audio. Word bubbles and color-based displays make different kinds of contributions legible without requiring everyone to write a long explanation.

![Mobile interaction studies and physical display configurations from Museum 4.X.](/media/emotion-clock/portfolio-interface.webp)

### Connecting contributions to the installation

The portfolio maps a workflow from cloud-based collection to Python processing and a hybrid information-processing model trained offline. The installation translates these contributions into a changing collective display. These diagrams describe the proposed system architecture rather than evidence of a deployed museum service.

A walkthrough around the Mona Lisa at the Louvre illustrates how a visitor might move between an artwork, other visitors’ responses, and their own interpretation. It is a design scenario, used to test the experience rather than a documented collaboration with the museum.
