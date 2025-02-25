---
title: Emotion "Clock"
subtitle: New Adaption in Contemporary Museum
title_overlay: true
layout: proj
abbrlink: '62474477'
date: 2025-02-23 00:51:18
tags: 
- design
categories: 
- project
- interaction design
mylabels:
- name: "Interaction Design"
- name: "Installation"
- name: "Emotion Analysis"
- name: "Data Science"
cover: /images/museum/history.jpg
---

<style>
.project-title, .project-subtitle{
  color: #FFFFFF!important;
}   
</style>

## Overview
Humans created time and reached a consensus on this concept, which is reflected through the clock. Likewise, I build a consensus of visitors knowledge toward exhibits and the panel is the clock in this reflection process. 

Visitors can see the overall attitude of previous visitors conveyed by the panel from a distance. The panel will leave a profound impression in their minds, even evoking some feelings of horror and fear, as it reveals something present in everyone but previously left unnamed, much like time.

### "Clock" System Design
#### Emotion Clock
![](images/museum/clock.png)
This is the visualization of a similarity matrix, which functioned as a clock to show visitors' attitudes toward other exhibits. It involves the mutual similarity of $x$ interactive visitors. The latest interactive visitors are set to default and displayed to the visitor. Since the current interactive visitor is the latest visitor to interact with the panel, column $n$ and row $n$ show similarities between this visitor and former $x$ visitors.

#### Clock Installation 
![](images/museum/device-3.png)
This panel installation is used to show the similarity matrix.

#### Data Workflow
This process depicts a detailed process related to data, from data collection to data computation. Expressly, the data storage and computation environment is set on the cloud. The data computation is based on Python, with different libraries in different tasks.
![](images/museum/data_workflow.png)


<div class="overview-quote">
The emotion analysis is based on the color wheel theory. Robert Plutchik, a psychologist, proposed the psychoevolutionary classification approach for general emotional responses and created a wheel of emotions to illustrate different emotions.

![](images/museum/color_wheel.png)
</div>

#### App Design
![](images/museum/device-1.png)
![](images/museum/device-2.png)

### Experience Map
![](images/museum/experience_map.png)

### More Than Museums
The pattern proposed in this project above is not only suitable for different types of museums, such as art museums, history museums, science museums, etc., but also can be adapted to other places where knowledge sharing can take place, for instance, relics, building, school, or even the supermarkets.

