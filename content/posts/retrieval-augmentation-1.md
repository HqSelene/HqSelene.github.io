---
title: "Retrieval Augmentation (1)"
date: "2024-01-20"
summary: "关于 FLARE、Rewrite-Retrieve-Read、RecMind 与 AgentCF 的阅读笔记。"
draft: false
sourceUrl: https://hqselene.github.io/post/626bd91e/
---

## FLARE

forward-looking active retrieval augmented generation

将最初的 $x$ 作为输入，生成下一个句子，两者结合作为query输入到retriever中进行，然后迭代几次最终生成答案。

### Overall Model

![](/media/posts/retrieval-augmentation-1/original-01.webp)

### FLARE_instruction

将与搜索相关的指令和示例作为技能1放在开头，然后将下游任务的指令和样例作为技能2。给定一个测试用例，我们要求LM在执行任务时结合技能1和2来生成搜索查询。

![](/media/posts/retrieval-augmentation-1/original-02.webp)

```
Skill 1. An instruction to guide LMs to generate search queries.  
Several search-related exemplars.

Skill 2. An instruction to guide LMs to perform a specific downstream task (e.g., multihop QA).  
Several task-related exemplars.

An instruction to guide LMs to combine skills 1 and 2 for the test case.  
The input of the test case.
```

### Direct FLARE

通过判断LM生成的句子是否confident，如果不是，则需要对query进行处理

1. Masked sentences as implicit queries.
2. Generated questions as explicit queries. (Self ask model)  

![Confidence-based Query Formulation](/media/posts/retrieval-augmentation-1/original-03.webp)

## Rewrite-Retrieve-Read

![](/media/posts/retrieval-augmentation-1/original-04.webp)

通过rewrite使得问题更加清晰，小模型是基于一个假的数据集并利用强化学习训练得到的。

## RecMind

![](/media/posts/retrieval-augmentation-1/original-05.webp)

#### Planning

帮助LLM将任务分解为更小、可管理的子目标，以有效地处理复杂任务。planning（x）是一组prompt，将问题$x$分解为一系列子任务，这些子任务由thought $h$、action $a$和observation $o$组成。

**Self-Inspiring (SI)**  
CoT和ToT都只考虑了一种可能性，SI则是基于之前的所有路径另外寻找一个reasoning的可能性。  

![](/media/posts/retrieval-augmentation-1/original-06.webp)

#### Memory

```
Personalized Memory：
    individualized user information
World Knowledge:
    item metadata information
    real-time information that can be accessed through Web search tool
```

## AgentCF

Item和user分别作为agent进行交互，相互更新对方的profile和interest。  

![](/media/posts/retrieval-augmentation-1/original-07.webp)


