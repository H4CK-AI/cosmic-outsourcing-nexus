
# Nexvora Outsourcing - 3D Space-Themed Experience

An immersive, space-inspired 3D web experience for Nexvora Outsourcing, showcasing Business Process Management (BPM), Legal Process Outsourcing (LPO), and IT Services in an interactive cosmic environment.

## Features

- **Interactive 3D Universe**: Immersive Three.js powered experience with orbital animations
- **Space-Inspired UI**: Grayscale cosmic theme with subtle purple/blue accents
- **Service Visualizations**: Dynamic 3D representations of outsourcing services
- **Responsive Design**: Fully optimized for all device sizes
- **Performance Optimized**: Efficient 3D rendering with optimized assets

## Technology Stack

- **React**: UI component architecture
- **TypeScript**: Type-safe code
- **Three.js / React Three Fiber**: 3D graphics rendering
- **GSAP**: Advanced animations and scrolling effects
- **Tailwind CSS**: Utility-first styling
- **Zustand**: Lightweight state management

## Project Structure

```
src/
├── components/
│   ├── ThreeDScene.tsx    # Main 3D scene with orbital animations
│   ├── Header.tsx         # Navigation header
│   ├── ServiceSection.tsx # Service showcase
│   ├── BenefitsSection.tsx # Benefits display
│   ├── CallToAction.tsx   # CTA section
│   ├── Footer.tsx         # Site footer
│   └── Loader.tsx         # 3D loading screen
├── pages/
│   ├── Index.tsx          # Main landing page
│   └── NotFound.tsx       # 404 page
└── ...
```

## Performance Optimization

The project implements several performance optimization strategies:

- **Efficient 3D Rendering**: Using instanced meshes and proper scene management
- **Progressive Loading**: Assets load progressively with priority given to visible elements
- **Code Splitting**: Components are loaded only when needed
- **Responsive Design**: Different levels of detail based on device capabilities
- **Caching**: Important assets are cached for improved subsequent loads

## Accessibility

Despite being a 3D-heavy experience, the site maintains accessibility through:

- Keyboard navigation support
- Screen reader compatibility
- Fallback text descriptions for 3D elements
- Sufficient color contrast and readable text

## Getting Started

1. Clone this repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Build for production with `npm run build`

## Future Enhancements

- Additional interactive service demonstrations
- Global outsourcing map visualization
- Cost savings calculator
- Client testimonial showcase
- More detailed service pages

## License

© Nexvora Outsourcing. All rights reserved.
