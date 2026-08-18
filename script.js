// @ts-check
/**
 * ENTRY POINT
 *
 * Converted from src/main.ts. Loads LAST — see the script order in index.html.
 *
 * PART A SCOPE
 * This boots the foundation and nothing else. No sections are mounted, no
 * assets are loaded, no animation runs. The stage is deliberately empty.
 *
 * What it does do:
 *   - registers the two Figma easing curves with GSAP
 *   - wires the state store to the stage theming
 *   - mounts the Figma reference overlay (development contexts only)
 *   - runs a self-check and prints the acceptance criteria to the console
 *
 * Sections start being mounted from stage 5 of the roadmap.
 */

(function () {
  "use strict";

  var NFV = window.NFV;

  /**
   * Keep the complete 1920x1080 composition inside the browser's ACTUAL
   * visible content area. CSS viewport units are retained as a fallback, but
   * VisualViewport is the authoritative value when browser zoom / display
   * scaling changes the usable height.
   *
   * The approved overall size remains 92%; only the single root scale changes.
   * Every authored rem coordinate, the viewport continuation and the stage
   * therefore resize together without any per-element adjustments.
   */
  function syncStageScale() {
    var visual = window.visualViewport;
    var layoutWidth = document.documentElement.clientWidth || window.innerWidth;
    var layoutHeight = document.documentElement.clientHeight || window.innerHeight;
    var viewportWidth = visual ? Math.min(layoutWidth, visual.width) : layoutWidth;
    var viewportHeight = visual ? Math.min(layoutHeight, visual.height) : layoutHeight;
    var fit = Math.min(
      viewportWidth / NFV.DESIGN_WIDTH,
      viewportHeight / NFV.DESIGN_HEIGHT,
    );
    var rootPx = NFV.meta.baseFontSize * fit * 0.92;

    document.documentElement.style.setProperty(
      "--stage-root-px",
      rootPx.toFixed(4) + "px",
    );

    // The splash is its own Figma prototype frame rather than part of the
    // intentionally reduced 92% hero stage. Scale its single 1920x1080 canvas
    // with a centred cover calculation so the browser is always filled while
    // the authored coordinate system and 16:9 proportions remain untouched.
    /* A fixed overlay is sized against the layout viewport.  Reusing the
       reduced VisualViewport dimensions here can undersize the cover canvas
       when Chrome zoom/display scaling makes the two viewports differ,
       exposing the overlay's edge as a border. */
    var splashViewportWidth = window.innerWidth || layoutWidth;
    var splashViewportHeight = window.innerHeight || layoutHeight;
    var splashCoverScale = Math.max(
      splashViewportWidth / NFV.DESIGN_WIDTH,
      splashViewportHeight / NFV.DESIGN_HEIGHT,
    );
    document.documentElement.style.setProperty(
      "--splash-cover-scale",
      splashCoverScale.toFixed(6),
    );
    var splashFitScale = Math.min(
      splashViewportWidth / NFV.DESIGN_WIDTH,
      splashViewportHeight / NFV.DESIGN_HEIGHT,
    );
    document.documentElement.style.setProperty(
      "--splash-fit-scale",
      splashFitScale.toFixed(6),
    );

    // The viewport continuation uses the same 2000px circular field as the
    // Figma stage. Increase only its final compositor scale enough for that
    // circle to reach every browser corner; its centre and small state stay
    // identical to the stage animation.
    var fieldDiameter = 125 * rootPx;
    var viewportDiagonal = Math.hypot(viewportWidth, viewportHeight);
    var fieldScale = Math.max(1, viewportDiagonal / fieldDiameter * 1.01);
    document.documentElement.style.setProperty(
      "--viewport-field-scale",
      fieldScale.toFixed(4),
    );
  }

  /**
   * Part A self-check.
   *
   * Prints the acceptance criteria to the console with a live pass/fail, so
   * "the stage is correctly scaled" is something you can verify rather than
   * squint at. Removed once real sections exist.
   */
  function verifyFoundation() {
    var stage = document.getElementById("stage");
    if (!stage) {
      console.error("[part A] FAIL — #stage not found");
      return;
    }

    var rootPx = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    var rect = stage.getBoundingClientRect();

    // The stage is 120rem x 67.5rem, so its aspect ratio must always be 16:9
    // no matter what the viewport is doing.
    var ratio = rect.width / rect.height;
    var expectedRatio = NFV.DESIGN_WIDTH / NFV.DESIGN_HEIGHT;
    var ratioOk = Math.abs(ratio - expectedRatio) < 0.01;

    // Effective scale vs the 1920x1080 design.
    var scale = rect.width / NFV.DESIGN_WIDTH;

    // Fonts: confirm each family actually resolved, rather than trusting the
    // @font-face rules. document.fonts.check() is the only honest test, and
    // it is also what will catch Chrome refusing to load fonts over file://.
    var fontChecks = [
      ["Poppins 800", '800 16px "Poppins"'],
      ["Poppins 600", '600 16px "Poppins"'],
      ["Poppins 500", '500 16px "Poppins"'],
      ["Inter 900", '900 16px "Inter"'],
      ["Inter 800", '800 16px "Inter"'],
      ["Inter 700", '700 16px "Inter"'],
      ["Inter 500", '500 16px "Inter"'],
      ["Plus Jakarta Sans 800", '800 16px "Plus Jakarta Sans"'],
      ["Roboto Condensed 700", '700 16px "Roboto Condensed"'],
    ];

    document.fonts.ready.then(function () {
      var results = fontChecks.map(function (pair) {
        return { face: pair[0], loaded: document.fonts.check(pair[1]) };
      });
      var allOk = results.every(function (r) {
        return r.loaded;
      });

      var gsapOk = !!window.gsap;
      var easeOk = !!(
        window.CustomEase && window.CustomEase.get(NFV.EASE_FLAVOR)
      );

      console.groupCollapsed(
        "%c NESTLÉ FRUITA VITALS — Part A foundation check ",
        "background:#FF7A00;color:#fff;font-weight:700;padding:2px 6px;border-radius:3px",
      );

      console.table({
        protocol:
          window.location.protocol +
          (window.location.protocol === "file:"
            ? "  (opened directly from disk)"
            : "  (served)"),
        viewport: window.innerWidth + " x " + window.innerHeight,
        "root font-size": rootPx.toFixed(3) + "px  (16px at 1920 wide)",
        "stage size": rect.width.toFixed(1) + " x " + rect.height.toFixed(1),
        "effective scale":
          (scale * 100).toFixed(1) + "%  of the 1920x1080 design",
        "aspect ratio":
          ratio.toFixed(4) + (ratioOk ? "  OK 16:9" : "  FAIL — expected 1.7778"),
        "stage background": getComputedStyle(stage).backgroundColor,
        "active view": NFV.store.getState().view,
        "flavours loaded":
          NFV.TOTAL_FLAVORS +
          " — " +
          NFV.FLAVORS.map(function (f) {
            return f.title;
          }).join(", "),
        GSAP: gsapOk ? "v" + window.gsap.version : "MISSING",
        "easings registered": easeOk
          ? NFV.EASE_FLAVOR + ", " + NFV.EASE_DETAILS + ", " + NFV.EASE_SPLASH
          : "FAILED",
        "flavour curve":
          "cubic-bezier(" +
          NFV.CURVES.flavor.x1 +
          ", " +
          NFV.CURVES.flavor.y1 +
          ", " +
          NFV.CURVES.flavor.x2 +
          ", " +
          NFV.CURVES.flavor.y2 +
          ")",
        "flavour duration": NFV.DURATION.flavor + "s",
      });

      console.log(
        allOk ? "%c[OK] all 9 font faces loaded" : "%c[FAIL] some fonts did not load",
        "color:" + (allOk ? "#4caf50" : "#ff5252") + ";font-weight:700",
      );

      if (!allOk) {
        console.table(results);
        if (window.location.protocol === "file:") {
          console.warn(
            "Chrome is likely blocking @font-face over file://.\n" +
              "Fix: open style.css and swap the two font import lines —\n" +
              '  comment out  @import url("assets/css/fonts.css");\n' +
              '  uncomment    @import url("assets/css/fonts-embedded.css");\n' +
              "Same fonts, embedded as base64, cannot be blocked.",
          );
        }
      }

      console.log(
        "%cResize the window — the stage should stay exactly 16:9 and the scale should track the viewport.",
        "color:#888",
      );
      console.groupEnd();
    });
  }

  function boot() {
    // Set the shared stage/background scale before any geometry is measured.
    syncStageScale();

    // Register the two Figma curves with GSAP before anything could use them.
    NFV.initEasings();

    // Keep --flavor-color and the data-flavor / data-view attributes in sync
    // with the store. Both the stage and the letterbox area read that
    // variable, so the frame edges stay invisible.
    NFV.store.initTheme();

    // Wire the flavour-change controls. Markup/styling were already built
    // and approved; this just attaches behaviour to what's already there.
    NFV.components.ArrowControls.mount();
    NFV.components.ThumbRail.mount();
    NFV.components.DetailsPanel.mount();
    NFV.components.Splash.mount();

    // Keyboard navigation, matching the approved interaction spec.
    window.addEventListener("keydown", function (event) {
      var target = event.target;
      if (
        event.metaKey || event.ctrlKey || event.altKey ||
        (target && target.isContentEditable) ||
        target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (!NFV.store.canChangeFlavor()) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        NFV.playFlavorChange(NFV.store.resolveNext());
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        NFV.playFlavorChange(NFV.store.resolvePrev());
      }
    });


    // Development contexts only (localhost / file://). Add ?dev=0 to disable.
    NFV.initFigmaOverlay();

    verifyFoundation();

    // Re-run the geometry report on resize so the scaling behaviour is
    // observable while you drag the window.
    var resizeTimer;
    window.addEventListener("resize", function () {
      syncStageScale();
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(verifyFoundation, 250);
    });

    // Chrome exposes a separate visual viewport when zoom/display scaling
    // changes the genuinely visible content area without a normal resize.
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", syncStageScale);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
