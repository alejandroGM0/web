---
title: "BlablaCar Clone"
description: "Full-stack carpooling platform with real-time ride matching and booking system"
technologies: ["Django", "React", "PostgreSQL", "Docker", "Redis"]
githubUrl: "https://github.com/alejandroGM0"
liveUrl: ""
coverImage: "/images/blablacar.png"
featured: true
features: [
  { icon: "GridView", title: "Geospatial Indexing", description: "PostGIS optimization for ride matching", color: "blue" },
  { icon: "Layers", title: "Real-time Updates", description: "WebSocket notifications for bookings", color: "purple" },
  { icon: "AccountTree", title: "Smart Caching", description: "Redis strategy for high-traffic routes", color: "emerald" },
  { icon: "Map", title: "Secure Payments", description: "Stripe integration for automated payouts", color: "amber" }
]
challenge: "Creating a scalable ride-matching algorithm that considers multiple factors like route overlap, time windows, and user preferences while maintaining sub-second response times."
solution: "Implemented a geospatial indexing system with PostGIS for efficient route matching, combined with Redis caching for frequently accessed routes and real-time availability updates."
devTime: "4 months"
role: "Full Stack Developer"
battery: "3 Hours"
keyLearning: "Deep understanding of geospatial queries and the importance of proper database indexing for location-based services."
heroImage: "/images/blablacar.png"
---

## Overview

A feature-complete carpooling platform inspired by BlablaCar, allowing users to share rides, reduce costs, and travel sustainably.

## Key Features

- **Smart Route Matching**: Geospatial algorithm finds optimal ride matches
- **Real-time Booking**: Instant seat reservation with availability updates
- **User Verification**: Multi-step verification for driver safety
- **Payment Integration**: Secure in-app payments with Stripe
- **Rating System**: Trust-based community reviews
