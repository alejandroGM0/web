---
title: "Videogame"
description: "High-intensity isometric roguelite built on a custom engine. Inspired by Vampire Survivors, manage a squad of distinct units and survive endless hordes."
technologies: ["Java", "Custom Engine", "OpenGL", "Gradle"]
githubUrl: ""
liveUrl: ""
coverImage: "/images/entity-swarm.png"
images: [
  { url: "/images/entity-swarm-lighting.png", caption: "Gameplay" },
  { url: "/images/entity-swarm-debug.png", caption: "Debug View | No Lighting/Post-processing | Min Graphics" }
]
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
keyLearning: "Building an engine from scratch is the ultimate test of optimization skills. Managing memory layouts and draw calls manually taught me more about low-level performance than any framework could."
solutionFeatures: [
  { icon: "Memory", title: "Data-Oriented", description: "Contiguous memory layout for cache efficiency", color: "blue" },
  { icon: "GridView", title: "Spatial Hashing", description: "O(1) lookup for collision detection", color: "purple" },
  { icon: "RocketLaunch", title: "Instanced Rendering", description: "Single draw call for 1000+ sprites", color: "emerald" },
  { icon: "AccountTree", title: "Modular AI", description: "Decoupled behavior trees for units", color: "amber" }
]
codeSnippets: [
  {
    label: "Entity Factory",
    description: "Component composition for creating game entities.",
    code: "public int createZombie(float x, float y) {\n    int entity = registry.createEntity();\n    \n    registry.addComponent(entity, new TransformComponent(x, y));\n    registry.addComponent(entity, new SpriteComponent(Textures.ZOMBIE));\n    registry.addComponent(entity, new HealthComponent(100));\n    registry.addComponent(entity, new AIComponent(AI_TYPE.AGGRESSIVE));\n    registry.addComponent(entity, new ColliderComponent(16f, 16f));\n    \n    return entity;\n}"
  },
  {
    label: "Sparse Set Registry",
    description: "High-performance component storage using Sparse Sets for O(1) access.",
    code: "public class SparseSet<T> {\n    private int[] sparse = new int[MAX_ENTITIES];\n    private int[] dense = new int[MAX_ENTITIES];\n    private T[] data = (T[]) new Object[MAX_ENTITIES];\n    private int size = 0;\n\n    public void add(int entity, T component) {\n        sparse[entity] = size;\n        dense[size] = entity;\n        data[size] = component;\n        size++;\n    }\n}"
  },
  {
    label: "System Manager",
    description: "Iterating component arrays for maximum cache locality.",
    code: "public void update(float dt) {\n    int[] entities = getEntities(TransformComponent.class, VelocityComponent.class);\n    \n    for (int e : entities) {\n        TransformComponent t = transforms[e];\n        VelocityComponent v = velocities[e];\n        \n        t.x += v.dx * dt;\n        t.y += v.dy * dt;\n        \n        // Contiguous memory access ensures performance\n    }\n}"
  }
]
heroImage: "/images/entity-swarm.png"
status: "in-development"
releaseDate: "2026"
announcementDate: ""
---

**This project** is a videogame where I am building a **custom engine** from scratch. It blends the addictive power curve of *Vampire Survivors* with the squad management tactical depth of *Yet Another Zombie Survivors*.

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
