---
title: "Set name"
date: 2026-01
location: "Doha, Qatar"
description: "Optional one-line description of the set."
cover: "frame-01.jpg"            # filename inside public/images/photos/<this-set-slug>/
draft: false
# Places or themes this set belongs to. These become the filter chips at the top
# of /photography. The chips are built from whatever tags exist across all sets,
# so a new place appears on its own the first time a set uses it, and a chip is
# never shown with nothing behind it. Tags sit on the set, not on single frames.
tags: ["Doha", "Street"]
frames:
  - src: "frame-01.jpg"          # the first frame of a set is its hero image
    alt: "Plain description of the photo (for accessibility + SEO)"
    caption: "Optional caption shown in the lightbox"
    # EXIF is read automatically from the file by the build script.
    # Only override if a value is missing or wrong:
    # camera: "Fujifilm X-T4"
    # lens: "XF 35mm f/2"
    # focal: "35 mm"
    # aperture: "f/2.8"
    # shutter: "1/250 s"
    # iso: "400"
  - src: "frame-02.jpg"
    alt: "Second photo description"
---

Optional essay body for the set. Renders above or beside the frames.
