---
title: Aid-Sync
category: Data & Research
year: "2021"
intro: Designing a mutual-aid information ecosystem.
summary: A crisis-response platform concept that organizes public posts, verifies urgent needs, and connects distributed online participation with on-site rescue.
tags:
  - Civic technology
  - NLP
  - Information systems
cover: /media/aid-sync/cover.jpg
role: Researcher · Information designer
tools: Data analysis · System mapping · Web design
order: 9
draft: false
sectionLabels:
  Public participation is powerful—and hard to coordinate: Context
  Turning fragmented posts into actionable signals: System
---

## Overview

The Wuhan lockdown and the Henan floods were significant public crises that caused severe damage in recent years. These events highlighted the potential of pan-media as an innovative response mechanism for emergencies, integrating ordinary citizens into the traditionally government-led rescue system. By forming a “mutual aid ecosystem”, pan-media facilitates real-time feedback on rescue information and online rescue efforts alongside official on-site operations.

However, the spontaneous “mutual aid ecosystem” formed through social media has limitations, such as redundant data and difficulties in extracting valuable information.

This project aims to develop a data platform model that collects, processes, and visualizes public emergency information from social media, providing a structured prototype system for more effective crisis response.

## Project Design Process

![](/media/aid-sync/process.png)

## Henan Rainstorm Data Analysis

In order to study the phenomena we observed, verify the hypotheses we proposed, and design a suitable data platform model, we obtained the Weibo data from July 20, 2021 to July 22 2021 by calling the API, and extracted useful information, and analyzed the obtained data after cleaning.

**The formation process of the “mutual aid ecosystem” on social media**: In the entire ecosystem, we can see that in addition to help-seekers, different roles such as information release or- ganizers, information classification volunteers, and network res- cuers have also been formed, with corresponding functions and tasks. This division of labor plays a significant impact in mutual aid.  

![](/media/aid-sync/mutual-aid.png)

**Posts forward distribution**: The overall distribution showed a long-tail distribution which indicates the exist of Pareto principle. A small amount of informa- tion receives a large amount of exposure and it lead to the decrease the efficiency of the rescue and wastes a lot of time and human resources.  

![](/media/aid-sync/distribution.png)

## Data Processing System Design

**Data Collection**: In this project, the data mainly comes from social media platforms. In theory, to ensure the timeliness of information, we need to update data in real-time, but updating data in real-time consumes a large amount of computing resources and storage resources. Many platforms also limit the frequency of crawling data. Therefore, to balance data timeliness and platform overhead, we adopt a batch processing mode to perform batch calculations on data.

**Data Extraction**: This function is mainly used to clean, integrate and extract information from the original data. After cleaning, the data must be integrated and struc tured information extracted to facilitate subsequent.

**Data Classifications**: Data classification includes a text classifier, which is used to classify roughly extracted text information into three categories: help-seeking posts, help-providing posts, and others.

**Data Visualization**: This part visualizes the obtained data to present the data more intuitively and conveniently. In public emergencies, the most important informationnincludes geographical location information, contact information, and information content. Based on the above demands, we divide the visualization into geographical location and summary information. The former one is presented through a map, while latter is shown through a list and has filtering and retrieval functions  

![](/media/aid-sync/system.png)

## Demo

![](/media/aid-sync/demo.png)
![](/media/aid-sync/demo-02.png)



## Design notes

### Public participation is powerful—and hard to coordinate

During large-scale emergencies, social media can connect needs, resources, and volunteers faster than centralized systems alone. It can also create duplication, noise, unverifiable claims, and rapidly outdated information.

Aid-Sync studies this tension through recent public crises and frames citizen participation as part of a mutual-aid ecosystem.

### Turning fragmented posts into actionable signals

The concept clusters and structures rescue-related posts, supports verification and status updates, and maps information flows between online participants and official response.

The goal is not to replace institutional rescue, but to create a clearer interface between distributed public energy and coordinated action.

### Learning from two emergency contexts

The portfolio examines information sharing around the Wuhan lockdown and the Henan rain disaster. In both contexts, public posts can surface needs that are difficult to coordinate through a single channel. Reposts and volunteer participation also create overlapping records that become hard to maintain as situations change.

The platform concept therefore treats collection, interpretation, and updating as parts of the same workflow. A useful rescue record must remain understandable after it has moved between platforms and participants.

### A pipeline for time-sensitive information

The system diagram connects data collection to cleaning, integration, information extraction, and visualization. Batch processing is proposed in response to the practical tradeoff between information freshness, computing resources, and limits on platform crawling.

![Proposed collection, processing, and presentation workflow from the portfolio.](/media/aid-sync/portfolio-workflow.webp)

The accompanying prototype screens explore how structured records and map-based views could help people inspect requests. The portfolio documents a concept and implementation exploration; it does not establish a live emergency-response deployment.

This project is distinct from the [data portrait of 1,183 help seekers](/projects/help-seekers): that study analyzes a historical dataset, while Aid-Sync explores a reusable information workflow.
