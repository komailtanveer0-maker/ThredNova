#!/bin/bash
set -e

mkdir -p public/assets/videos public/assets/images

# Video 1: 14.3 seconds vertical 720x1280 (Kitchen & Pizza craft)
ffmpeg -y \
  -f lavfi -i "color=c=0x0a0f1d:s=720x1280:d=14.3:r=30" \
  -f lavfi -i "anullsrc=r=44100:cl=stereo" \
  -vf "
    drawbox=y=0:color=0x060913@1:width=iw:height=ih:t=fill,
    drawbox=x=40:y=60:w=640:h=1160:color=0x1e293b@0.8:t=fill,
    drawbox=x=40:y=60:w=640:h=1160:color=0x38bdf8@0.4:t=3,
    drawbox=x=60:y=80:w=600:h=80:color=0x0284c7@0.9:t=fill,
    drawtext=text='PIZZA GARDEN':fontcolor=white:fontsize=44:x=(w-text_w)/2:y=98,
    drawtext=text='CHAKWAL':fontcolor=0xfacc15:fontsize=28:x=(w-text_w)/2:y=175,
    drawtext=text='Taste · Ambience · Services':fontcolor=0x94a3b8:fontsize=22:x=(w-text_w)/2:y=210,
    drawbox=x=60:y=260:w=600:h=480:color=0x0f172a@1:t=fill,
    drawbox=x=60:y=260:w=600:h=480:color=0xf59e0b@0.6:t=2,
    drawtext=text='🔥 Sizzling Fresh Out Of The Oven':fontcolor=white:fontsize=28:x=(w-text_w)/2:y=300,
    drawtext=text='100% Mozzarella Pull':fontcolor=0xfbbf24:fontsize=36:x=(w-text_w)/2:y=390,
    drawtext=text='Hand-Tossed Dough & Rich Sauces':fontcolor=0xe2e8f0:fontsize=24:x=(w-text_w)/2:y=460,
    drawtext=text='Signature Behari Spin Rolls':fontcolor=0x38bdf8:fontsize=30:x=(w-text_w)/2:y=540,
    drawtext=text='With Homemade Garlic Mayo Dip':fontcolor=0x94a3b8:fontsize=22:x=(w-text_w)/2:y=600,
    drawbox=x=60:y=770:w=600:h=260:color=0x0284c7@0.15:t=fill,
    drawtext=text='WATCH PIZZA REEL':fontcolor=0xfacc15:fontsize=32:x=(w-text_w)/2:y=820,
    drawtext=text='Kitchen Craft & Live Baking':fontcolor=white:fontsize=24:x=(w-text_w)/2:y=880,
    drawtext=text='Talagang Hwy, opposite NFC, Chakwal':fontcolor=0x38bdf8:fontsize=20:x=(w-text_w)/2:y=940,
    drawtext=text='WhatsApp: +92 329 6864242':fontcolor=0x22c55e:fontsize=26:x=(w-text_w)/2:y=1120
  " \
  -c:v libx264 -pix_fmt yuv420p -t 14.3 -c:a aac -b:a 128k -shortest \
  public/assets/videos/pizzagarden-kitchen-reel.mp4

# Video 2: 35.6 seconds vertical 720x1280 (Restaurant Dining & Ambience)
ffmpeg -y \
  -f lavfi -i "color=c=0x060913:s=720x1280:d=35.6:r=30" \
  -f lavfi -i "anullsrc=r=44100:cl=stereo" \
  -vf "
    drawbox=y=0:color=0x060913@1:width=iw:height=ih:t=fill,
    drawbox=x=40:y=50:w=640:h=1180:color=0x0f172a@0.9:t=fill,
    drawbox=x=40:y=50:w=640:h=1180:color=0xf59e0b@0.3:t=2,
    drawbox=x=60:y=70:w=600:h=100:color=0x0369a1@0.9:t=fill,
    drawtext=text='PIZZA GARDEN':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=85,
    drawtext=text='CHAKWAL - PAKISTAN':fontcolor=0xfacc15:fontsize=26:x=(w-text_w)/2:y=135,
    drawbox=x=60:y=200:w=600:h=560:color=0x020617@0.95:t=fill,
    drawbox=x=60:y=200:w=600:h=560:color=0x38bdf8@0.5:t=2,
    drawtext=text='🌿 LUXURY AMBIENCE & DINING':fontcolor=0xfbbf24:fontsize=32:x=(w-text_w)/2:y=240,
    drawtext=text='Warm Glow Pendant Lighting':fontcolor=white:fontsize=26:x=(w-text_w)/2:y=320,
    drawtext=text='Lush Indoor Palms & Greenery':fontcolor=0x4ade80:fontsize=26:x=(w-text_w)/2:y=380,
    drawtext=text='Signature Circular Seating Booths':fontcolor=white:fontsize=26:x=(w-text_w)/2:y=440,
    drawtext=text='Cozy Brick Arches & Family Tables':fontcolor=white:fontsize=26:x=(w-text_w)/2:y=500,
    drawtext=text='Fairy Light Staircase Entrance':fontcolor=0xfacc15:fontsize=26:x=(w-text_w)/2:y=560,
    drawtext=text='Open Daily 11:00 AM – 1:00 AM':fontcolor=0x38bdf8:fontsize=26:x=(w-text_w)/2:y=640,
    drawbox=x=60:y=790:w=600:h=260:color=0x1e293b@0.8:t=fill,
    drawtext=text='DISCOVER THE EXPERIENCE':fontcolor=white:fontsize=30:x=(w-text_w)/2:y=830,
    drawtext=text='Dine-In · Take-Away · Family Parties':fontcolor=0xfacc15:fontsize=24:x=(w-text_w)/2:y=890,
    drawtext=text='Talagang Hwy, opposite NFC, Chakwal':fontcolor=0x94a3b8:fontsize=22:x=(w-text_w)/2:y=950,
    drawtext=text='WhatsApp Orders: +92 329 6864242':fontcolor=0x22c55e:fontsize=28:x=(w-text_w)/2:y=1120
  " \
  -c:v libx264 -pix_fmt yuv420p -t 35.6 -c:a aac -b:a 128k -shortest \
  public/assets/videos/pizzagarden-ambience-reel.mp4

# Generate poster frames / thumbnails
ffmpeg -y -ss 00:00:02 -i public/assets/videos/pizzagarden-kitchen-reel.mp4 -vframes 1 -q:v 2 public/assets/videos/kitchen-thumb.jpg
ffmpeg -y -ss 00:00:02 -i public/assets/videos/pizzagarden-ambience-reel.mp4 -vframes 1 -q:v 2 public/assets/videos/ambience-thumb.jpg

echo "Videos generated successfully!"
