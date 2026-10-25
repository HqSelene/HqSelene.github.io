---
title: Musical Influence as a Directed Network
category: Data & Research
year: "2021"
intro: Who shapes the sound of an era?
summary: A mathematical framework tracing influence across more than 5,600 musicians through graphs, acoustic features, and dynamic analysis.
tags:
  - Network science
  - PageRank
  - Data storytelling
cover: /media/musical-influence/cover.png
role: Modeling · Analysis · Visualization
tools: Python · NetworkX · scikit-learn · Pandas
order: 8
draft: false
sectionLabels:
  Finalist · 2021 MCM/ICM: Recognition
  Four models, one evolving network: Method
links:
  - label: Read the full paper
    url: https://github.com/HqSelene/2021MCM-ICM/blob/main/The%20research%20of%20musical%20influence%20based%20on%20the%20characteristic%20of%20a%20network.pdf
---
**Finalist Award** · 2021 MCM/ICM Mathematical Contest in Modeling
**Team Member** · Qing He · Ruiqing Hu · Liang Yin
**Tools** Python · NetworkX · scikit-learn · Pandas
Full paper you can find [here](<https://github.com/HqSelene/2021MCM-ICM/blob/main/The%20research%20of%20musical%20influence%20based%20on%20the%20characteristic%20of%20a%20network.pdf>).

## Project Statement

> Who shapes the sound of an era? This project builds a mathematical framework to trace how influence travels through 5600+ musicians, using modified PageRank, entropy-weighted similarity, and dynamic graph analysis.

## Quantifying the Unmeasurable

Most accounts of musical evolution rely on narrative: critics, anecdote, history books. This project takes a different approach by treating the relationships between musicians as a directed graph, where every edge encodes who influenced whom, and every node carries an 11-dimensional acoustic feature vector.

The central question: can we move beyond subjective claims and rigorously model how influence propagates, which genres are truly distinct, and when musical revolutions actually occurred?

![The Directed Network](/media/musical-influence/cover.png)

## Four Interlocking Models

Rather than a single algorithm, this project chains four models together - each feeding into the next.

### Modified PageRank

Standard PageRank adapted for music influence, with damping factor q = 0.3 (vs. the web’s 0.85). The key insight: musical followers becoming influencers themselves is far less probable than web browsing chains. A lower damping factor reflects that creative influence dissipates more quickly than hyperlink traversal.

### Entropy-Weighted Similarity

Feature weights derived via Information Entropy (EWM) across 11 acoustic dimensions — danceability, energy, valence, tempo, loudness, acousticness, instrumentalness, liveness, speechiness, mode, and key. The principle: higher entropy in a feature → higher discriminative power → higher weight. Similarity is then the inverse of the Weighted Euclidean Distance between two artist vectors.

### Hierarchical Clustering + PCA

Complete-linkage hierarchical clustering groups all 20 genres into 4 macro-clusters. PCA reduces the feature space to 3D for visualization. The surprising finding: instrumentalness and speechiness are the primary axes separating genres — not the more intuitive energy or tempo.

### Dynamic PageRank

Extends the base model by weighting each influence edge with two dynamic indices: θ_time (temporal distance between artists’ active periods) and θ_genre (cross-genre musical distance). Artists who transcend both era and genre rank higher as “dynamic influencers”, a more nuanced measure than raw follower count.

## Key Findings

After running the full model pipeline across 5,603 musicians and ~42,000 influence edges, five results stood out.

### Finding 1

Influence follows a power law. A handful of artists, such as The Beatles, Bob Dylan, Hank Williams, account for a disproportionate share of total network influence, consistent with scale-free network behavior. The top 20 artists by PageRank collectively shape the trajectories of thousands of followers.

![The Rank of musical influence by the PR value](/media/musical-influence/ranking.png)

### Finding 2

Mainstream genres self-reinforce; niche genres borrow. Jazz, Pop/Rock, and Country receive 70%+ of their influence from within their own genre. Electronic, New Age, and Avant-Garde draw less than 40% internally, actively absorbing from adjacent styles. Established genres have stable identities; emerging ones are still searching for one.

![IFSP of Different Music Genres](/media/musical-influence/influence.png)

### Finding 3

Three musical revolutions, verified quantitatively. Similarity-over-time analysis pinpoints the 1950s Rock & Roll emergence, the 1960s British Invasion, and 1980s contemporary R&B as moments of maximal stylistic discontinuity. These align precisely with known historical events, which means that the model independently recovered what music historians already knew.

![Revolution Events and the Music Similarities between years](/media/musical-influence/event.png)
![Artists of Different Genres Time Distribution](/media/musical-influence/timeline.png)

### Finding 4

Influencers don’t always convert followers. Only 52.4% of followers show increased musical similarity to their influencer’s style over time. The other 47.6% diverge. Imitation and divergence coexist as creative strategies, and the data can’t fully distinguish which is which.

### Finding 5

Genre identity lives in two dimensions. Of all 11 acoustic features, speechiness and instrumentalness show the largest gap between genre clusters. Energy and tempo, which most people intuitively associate with genre, are comparatively weak discriminators.

## Design notes

### Finalist · 2021 MCM/ICM

Most histories of musical influence are narrative. This project treats relationships between musicians as a directed graph, where each edge records influence and each artist carries an acoustic feature profile.

The work combines network topology with musical similarity to move from anecdote toward a reproducible model of how styles travel.

### Four models, one evolving network

Modified PageRank, entropy-weighted similarity, influence propagation, and temporal analysis are chained together so that each model informs the next.

The resulting system surfaces influential artists, detects stylistic communities, and shows how musical characteristics move across genres and generations.

![Similarity](/media/musical-influence/similarity.png)

### Comparing sound across artists and genres

The feature-based analysis uses entropy weighting to assign different contributions to musical attributes. Genre profiles are represented by the mean of their feature vectors, allowing the study to compare stylistic similarity alongside the explicit influence relationships in the network.

This distinction matters: two artists can sound similar without a recorded influence relationship, while an influence can connect artists whose later work diverges. Combining the two views makes the analysis more informative than either ranking or acoustic similarity alone.

### Clusters, dimensions, and change over time

Complete-linkage hierarchical clustering in scikit-learn organizes the feature profiles into four groups. Principal component analysis provides a lower-dimensional view of their relationships, while temporal comparisons examine how styles and influence change across periods.

The project was completed by **He Qing, Hu Ruiqing, and Yin Liang**. My contribution focused on modeling and programmed visualization. The portfolio presents the work as an MCM/ICM Finalist project.
