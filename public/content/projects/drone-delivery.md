---
title: "Drone Delivery Network"
description: "Experimental autonomous logistics platform. Currently in early prototyping phase (Pre-Alpha)."
technologies: ["C++", "Python", "ROS 2", "OpenCV", "Raspberry Pi"]
githubUrl: "#"
liveUrl: ""
coverImage: "/images/drone-delivery.png?v=2"
featured: true
challenge: "Building a complex autonomous system from scratch, balancing hardware constraints with ambitious software goals in a custom-built frame."
solution: "Iterative development approach focusing on core flight stability before layering complex autonomy. Currently validating basic hardware-software integration."
devTime: "Early Stage"
role: "Systems Engineer"
battery: "N/A"
keyLearning: "Managing the complexities of hardware integration and real-time control loops in a physical system."
heroImage: "/images/drone-delivery.png?v=2"
badgeType: "Prototype"
status: "Pre-Alpha"
---

## Project Status: Very Early Stage (Green) 🌱

**Current Status**: This project is currently in a very early, experimental stage ("very green"). The hardware platform is assembled but the software stack is still being defined and basic flight characteristics are being tuned. This is not yet a production-ready system.

**Target**: The goal is to have a fully functional, autonomous flight prototype ready by **June 2026**.

## Detailed Overview

The Drone Delivery Network is an ambitious initiative to build a fully autonomous last-mile delivery vehicle from first principles. Unlike off-the-shelf commercial drones, this platform uses a custom component selection designed for modularity and research flexibility.

We are currently navigating the initial hurdles of "bringing the bird to life" — ensuring the flight controller interacts correctly with the custom power distribution board and that the companion computer (Raspberry Pi) can reliably send offboard setpoints without latency spikes.

## Hardware Specs (Subject to Change)

- **Frame**: Custom carbon fiber quadcopter frame (300mm wheelbase)
- **Flight Controller**: Pixhawk 6C (running PX4)
- **Companion Computer**: Raspberry Pi 4 (8GB) running ROS 2 Humble
- **Propulsion**: T-Motor F40 Pro III 2400KV motors, 35A BLHeli_32 ESCs
- **Vision**: Intel RealSense D435i (Integration pending stable flight)

## Roadmap to June

- **Phase 1 (Now)**: PID Tuning and basic manual flight.
- **Phase 2 (April)**: Stable Position Hold using Optical Flow.
- **Phase 3 (May)**: Autonomous waypoint navigation.
- **Phase 4 (June)**: Full delivery mission simulation (Takeoff -> Navigate -> Drop -> Land).
