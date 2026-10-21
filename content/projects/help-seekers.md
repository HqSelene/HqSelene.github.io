---
title: A Data Portrait of 1,183 Help Seekers
category: Data & Research
year: "2023"
intro: Reading public requests for help as human experiences.
summary: A visual analysis of Weibo help requests during the Wuhan lockdown, connecting demographic patterns, location, and access to medical resources.
tags:
  - Data visualization
  - Civic research
  - Spatial analysis
cover: /media/help-seekers/cover.webp
role: Data preparation · Visualization · Analysis
tools: Data cleaning · Geospatial analysis · Statistical visualization
order: 10
draft: false
sectionLabels:
  From public posts to a research dataset: Dataset
  A portrait across age, language, and place: Portrait
  Proximity is not the same as access: Resources
  Reading the limits of the portrait: Reflection
---

<!-- Year is the 2023 portfolio archive year; completion date awaits confirmation. The dataset covers February 3–10, 2020. Source: Reference/portfolio.pdf, pages 25–27. -->

*Archived in the 2023 portfolio. The year shown is the archive year; the project completion date is to be confirmed.*

## From public posts to a research dataset

During the Wuhan lockdown, people used Weibo to seek medical help for themselves and their families. A university lab collected posts from February 3–10, 2020. This study turns that material into a portrait of 1,183 help seekers, treating the records as accounts of people navigating a crisis.

Data preparation addressed missing, inconsistent, and ambiguous fields. After cleaning, 4,961 records remained; repeated information was then integrated through rules for numerical values, dates, and text. This distinction between posts and people is essential when interpreting the final portrait.

![Integration rules for combining repeated records into a help-seeker profile.](/media/help-seekers/integration.webp)

## A portrait across age, language, and place

The visual analysis brings together age distributions, frequently used words, and locations. The age curve has a smaller peak around 30 and a larger peak around 65. References to parents appear alongside terms such as fever and hospital, suggesting that some requests were written on behalf of relatives.

Geographic coordinates were mapped and assigned to districts using the Baidu API. The maps show many requests concentrated in central Wuhan. A separate comparison uses housing prices as an indirect indicator of economic context; it should not be read as a direct measure of an individual’s income.

![Demographic, textual, geographic, and housing-price views of the help-seeker dataset.](/media/help-seekers/portrait.webp "full")

## Proximity is not the same as access

The study compares help-seeker locations with the distribution of hospitals, including whether a hospital is available within three kilometers. The resulting charts distinguish geographic proximity from the practical ability to receive care during the emergency.

District-level comparisons consider hospital counts and the distribution of requests. Additional exploratory views examine urbanization, housing prices, and which accounts people mention to increase the visibility of their requests. Media accounts occupy a prominent place in that attention-seeking network.

![Medical-resource maps and district-level comparisons from the portfolio.](/media/help-seekers/medical-resources.webp "full")

## Reading the limits of the portrait

The dataset describes public requests captured during a specific week, rather than every person who needed help. The visualizations support comparison and further questions; they do not establish that a geographic or economic relationship caused an individual outcome.

This retrospective analysis is separate from [Aid-Sync](/projects/aid-sync), which explores a platform workflow for collecting and structuring information during public emergencies.
