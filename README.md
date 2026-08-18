Nestlé Fruita Vitals 🍊

A front-end recreation of the Nestlé Fruita Vitals interactive product experience, built from a Figma design.

The project focuses on translating the original 1920×1080 design into a working website while keeping the visual layout, product positioning, transitions, and interactions close to the original design.

Preview

Main Flavour Screen:
<img width="1919" height="954" alt="image" src="https://github.com/user-attachments/assets/0659fa68-ff75-423a-b402-2b55b13adfe0" />

Product Details
<img width="1919" height="940" alt="image" src="https://github.com/user-attachments/assets/a6a0cdbc-ec1d-4b66-a868-5082a4a79788" />





Features

* Four interactive flavour states
* Animated flavour transitions
* Interactive Orange product page
* Drag-based transition into the product details
* Animated product bottle
* Liquid and splash effects
* Product information and pricing
* Quantity selector
* Add-to-cart section
* Product feature cards
* Navigation between flavours and product details
* Animated splash screen
* Smooth UI transitions and micro-interactions

Built With

* HTML5
* CSS3
* JavaScript
* GSAP
* Figma

No framework or build system is required. The project runs using plain HTML, CSS and JavaScript.

Design to Code

The website was recreated from a Figma design with a fixed 1920×1080 art-directed layout.

The implementation includes the main visual details from the design, including:

* Typography
* Colours
* Product positioning
* Background effects
* Decorative elements
* UI components
* Product details
* Animation states
* Page transitions

The layout uses a scaled 1920×1080 stage so the original proportions are maintained across different screen sizes.

Animations & Interactions

GSAP is used for the main animations and transitions.

The project includes:

* Splash screen animation
* Flavour switching animations
* Product bottle movement
* Liquid and splash animations
* Drag interaction
* Orange → Details transition
* Details page entrance and exit transitions
* UI micro-interactions

The animations were recreated from the states and transitions in the original Figma design.

Project Structure

## Project Structure

```text
nestle-fruita-vitals/
├── index.html
├── style.css
├── script.js
├── jsconfig.json
└── assets/
    ├── css/
    ├── sections/
    ├── js/
    ├── fonts/
    ├── products/
    └── decor/
        ├── icons/
        ├── features/
        └── splash/
            └── splash-liquid/
```

The JavaScript is organized into separate files for data, state management, animations, components and utilities.

GSAP is included locally in the project, so there are no external dependencies that need to be installed.

Running Locally

No installation or build step is required.

Using VS Code Live Server

1. Clone the repository.
2. Open the project in VS Code.
3. Open index.html.
4. Right-click the file and select Open with Live Server.

The website will open in your browser.

Directly in the browser

You can also open index.html directly in Chrome.

Screenshots

Add your final project screenshots here.

Recommended screenshots:

* Main Orange flavour screen
* Other flavour screens
* Product details screen
* Splash screen
* A frame showing the drag interaction

Project Goal

The main goal of this project was to practice turning a high-fidelity visual design into a functional front-end experience.

Rather than creating only a static page, I focused on recreating the interactions, animations and product transitions from the original design.

Credits

Design reference: Nestlé Fruita Vitals Figma design.

Built as a front-end development project using HTML, CSS, JavaScript and GSAP.
