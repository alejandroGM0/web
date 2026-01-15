---
title: "Untitled Game Project"
description: "High-intensity isometric roguelite inspired by Vampire Survivors and Yet Another Zombie Survivors. Manage a squad of distinct units and survive endless hordes."
technologies: ["Java", "Custom Engine", "OpenGL", "Gradle"]
githubUrl: ""
liveUrl: ""
coverImage: "/images/entity-swarm.png"
images: ["/images/entity-swarm-gameplay.png", "/images/entity-swarm-ecs.png", "/images/entity-swarm-menu.png"]
featured: true
badgeType: "Game Dev"
features: [
  { icon: "GridView", title: "Custom ECS Engine", description: "Built from scratch in Java for max performance", color: "blue" },
  { icon: "Layers", title: "Spatial Partitioning", description: "Quadtree optimization for 1000+ entities", color: "purple" },
  { icon: "AccountTree", title: "Behavior Trees", description: "Complex AI for squad tactics and enemies", color: "emerald" },
  { icon: "Map", title: "Isometric Renderer", description: "Custom 2.5D rendering pipeline with OpenGL", color: "amber" }
]
challenge: "Implementing a high-performance game engine in Java without existing frameworks. The main goal was to handle 5000+ simultaneous entities (units, enemies, projectiles) at 60 FPS while managing complex squad mechanics and pathfinding on a dynamic isometric grid."
solution: "I developed a pure ECS (Entity Component System) architecture from scratch. This separates data from logic, allowing for cache-friendly memory access. The rendering pipeline uses batched instanced rendering via OpenGL (LWJGL) to draw thousands of sprites in a single draw call. For physics and AI, I implemented a uniform grid spatial partition system to keep collision detection checks O(1)."
devTime: "In Development"
role: "Lead Developer"
battery: "∞"
solutionFeatures: [
  { icon: "Memory", title: "Data-Oriented", description: "Contiguous memory layout for cache efficiency", color: "blue" },
  { icon: "GridView", title: "Spatial Hashing", description: "O(1) lookup for collision detection", color: "purple" },
  { icon: "RocketLaunch", title: "Instanced Rendering", description: "Single draw call for 1000+ sprites", color: "emerald" },
  { icon: "AccountTree", title: "Modular AI", description: "Decoupled behavior trees for units", color: "amber" }
]
codeSnippets: [
  {
    label: "Spatial Query",
    description: "Efficient O(1) broad-phase collision detection using a spatial hash grid.",
    code: "public List<Entity> query(AABB area) {\n    int startX = (int)(area.minX / cellSize);\n    int endX = (int)(area.maxX / cellSize);\n    List<Entity> result = new ArrayList<>();\n    \n    for (int x = startX; x <= endX; x++) {\n        // ... iterate relevant buckets ...\n        result.addAll(buckets[x][y]);\n    }\n    return result;\n}"
  },
  {
    label: "Behavior Tree",
    description: "Modular AI decision making for units.",
    code: "public NodeStatus tick(float dt) {\n    if (target == null || target.isDead()) {\n        target = findNearestEnemy();\n        return NodeStatus.RUNNING;\n    }\n    if (isInRange(target)) {\n        attack(target);\n        return NodeStatus.SUCCESS;\n    }\n    moveTo(target);\n    return NodeStatus.RUNNING;\n}"
  }
]
heroImage: "/images/entity-swarm.png"
status: "in-development"
releaseDate: "2026"
announcementDate: ""
---

## Overview

**Entity Swarm** (working title) is a high-performance implementation of the "bullet heaven" genre, blending the addictive power curve of *Vampire Survivors* with the squad management tactical depth of *Yet Another Zombie Survivors*.

Instead of controlling a single hero, you command a **tactical squad**. You don't just upgrade a weapon; you draft new specialized units—Snipers, Medics, Shieldbearers, and Mages—each with their own behavior trees and upgrade paths.

### Core Gameplay Loop
1.  **Survive**: Auto-attacking units defend against waves of enemies.
2.  **Draft**: Collect XP to recruit new units or upgrade existing ones.
3.  **Position**: Formations matter. Protect your squishy damage dealers with tanks.
4.  **Break the Game**: Stack synergies to create screen-clearing combos.

## Technical Deep Dive

This project is a showcase of **engine architecture**. It does not use Unity or Godot. It runs on a custom engine written in **Java** using **LWJGL** for OpenGL bindings.

### The Engine
*   **ECS Architecture**: Entities are just IDs. Components are data arrays. Systems contain logic. This ensures maximum cache coherence and performance.
*   **Custom Physics**: A deterministic interaction engine for handling thousands of colliding bodies.
*   **Behavior Tree AI**: Analyzing unit states to make intelligent targeting decisions (e.g., "Medic: Heal lowest HP ally nearby", "Sniper: Target highest threat elite").
