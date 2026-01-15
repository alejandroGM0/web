---
title: "Drone Delivery Network"
description: "Autonomous fleet management system for last-mile logistics. Currently building the hardware prototype."
technologies: ["C++", "Python", "ROS 2", "OpenCV", "Raspberry Pi"]
githubUrl: "#"
liveUrl: ""
coverImage: "/images/drone-delivery.png"
featured: true
challenge: "Designing a robust flight controller capable of handling variable payloads and wind conditions on custom hardware."
solution: "Implementing a custom PID controller on a Raspberry Pi with ROS 2 for high-level mission planning and computer vision for obstacle avoidance."
devTime: "In Development"
role: "Systems Engineer"
battery: "Testing Phase"
keyLearning: "Deep diving into real-time operating systems (RTOS) and sensor fusion algorithms for stable flight."
heroImage: "/images/drone-delivery.png"
badgeType: "Hardware"
status: "In Development"
---

## Project Status: In Construction 🚧

This project is currently in the heavy R&D phase. I am building the physical drone platform from scratch, focusing on the avionics and control systems.

## Hardware Specs

- **Frame**: Custom carbon fiber quadcopter frame (300mm wheelbase)
- **Flight Controller**: Pixhawk 6C (running PX4)
- **Companion Computer**: Raspberry Pi 4 (8GB) running ROS 2 Humble
- **Propulsion**: T-Motor F40 Pro III 2400KV motors, 35A BLHeli_32 ESCs
- **Vision**: Intel RealSense D435i for VIO (Visual Inertial Odometry)

## Current Progress

I am currently tuning the PIDs for the stabilization mode. The basics of the ROS 2 node graph are established, with successful communication between the flight controller and the companion computer via MAVLink.

### Next Steps

- [ ] Optimize VIO for GPS-denied navigation
- [ ] Implement precision landing using ArUco markers
- [ ] Stress test battery life with dummy payloads
