---
name: Metro image-size compatibility
description: Compatibility constraint between Metro 0.83 asset processing and image-size major versions.
---

Metro 0.83 expects the image-size 1.x API because it passes regular asset file paths to the package. Forcing image-size 2.x causes Metro web bundling to fail when the 2.x implementation treats that path as image bytes.

**Why:** The workspace’s global security override for image-size 2.x caused the Expo mobile preview to return HTTP 500 during Metro bundling, while Metro’s declared 1.x range resolves to the compatible 1.2.1 release and has no audit finding.

**How to apply:** Do not add a global image-size 2.x override unless Metro is upgraded to a version whose asset loader supports the 2.x API. After dependency changes, verify the Expo web bundle rather than relying only on Metro startup logs.