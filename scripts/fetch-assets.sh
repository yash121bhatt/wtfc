#!/usr/bin/env bash
# Mirrors every image asset used on wtfc.ca into public/images with clean filenames.
set -euo pipefail

DEST="$(cd "$(dirname "$0")/.." && pwd)/public/images"
mkdir -p "$DEST"

B="https://wtfc.ca"

# local_name|remote_path
ASSETS=(
  "logo.png|/assets/logo-C_pQg7qm.png"
  "hero-group.jpg|/attached_assets/hero-group.jpg"
  "hero-1.jpg|/attached_assets/Messenger_creation_04232106-51ED-4FD3-8E84-E5210A0CE3EA_1768508550852.jpeg"
  "hero-2.jpg|/attached_assets/Messenger_creation_C9FAEDF1-8C86-4800-9549-478AB631EB9E_1768508561719.jpeg"
  "hero-3.jpg|/attached_assets/Messenger_creation_23146D94-01ED-4D0D-B9ED-300461723284_1768508565130.jpeg"
  "about-hero.jpg|/assets/team-human-trafficking-awareness-CZsIGz3T.jpg"
  "about-mentorship.jpg|/attached_assets/Messenger_creation_23146D94-01ED-4D0D-B9ED-300461723284_1768507004478.jpeg"
  "contact-1.jpg|/attached_assets/Messenger_creation_1A4ED926-77C6-47B6-9224-FF9962F9474E_1768507004475.jpeg"
  "contact-2.jpg|/attached_assets/Messenger_creation_B9A1F0C4-600B-4B98-8B61-3AD404C71BEE_1768507004478.jpeg"
  "events-1.jpg|/attached_assets/Messenger_creation_014BDE7D-E292-491C-A1A7-FA738A799EE2_1768507004476.jpeg"
  "events-2.jpg|/attached_assets/Messenger_creation_076D1D00-C618-4D7B-A42F-A0ED17212C03_1768507004477.jpeg"
  "events-3.jpg|/attached_assets/Messenger_creation_732237DE-D244-435C-AA44-289EB60F81FE_1768507004478.jpeg"
  "events-4.jpg|/attached_assets/Messenger_creation_FB5E5EAA-B4E3-444F-A149-75D6761E0BBF_1768507004479.jpeg"
  "partner-ppe.png|/assets/women%27s_ppe_safety_gear-Sz6E0U95.png"
  "partner-shop.png|/assets/wtfc_branded_merchandise_display-CNHu8Zuh.png"
  "partner-timeas.png|/assets/artisan_marketplace_products-DAtdMJjZ.png"
  "partner-youtube.png|/assets/youtube_educational_content-DOHyFNfQ.png"
  "conference.jpg|/attached_assets/conference.jpg"
  "team.jpg|/attached_assets/team.jpg"
  "truck.jpg|/attached_assets/truck.jpg"
  "group.jpg|/attached_assets/group.jpg"
  "event-btb-ontario.png|/BTB_Ontario_2026_1780685735821.png"
  "event-btb-west.png|/objstore/member-photos/1773936131176-BTBWC-Conference-Story.png"
  "event-amta.jpg|/objstore/member-photos/1773936907095-AMTA-Conference-2026.jpeg"
)

fail=0
for entry in "${ASSETS[@]}"; do
  name="${entry%%|*}"
  path="${entry#*|}"
  if curl -sfL --max-time 40 -A "Mozilla/5.0" "$B$path" -o "$DEST/$name"; then
    printf '  ok   %-26s %8s\n' "$name" "$(du -h "$DEST/$name" | cut -f1)"
  else
    printf '  FAIL %-26s %s\n' "$name" "$path"
    fail=1
  fi
done

exit "$fail"
