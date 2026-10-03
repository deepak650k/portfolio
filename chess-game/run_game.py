#!/usr/bin/env python3
"""
Grandmaster Chess - Quick Launcher for Mac & Laptop
Usage:
    python3 run_game.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import threading
import time

PORT = 8080

def start_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    handler = http.server.SimpleHTTPRequestHandler
    # Suppress verbose log requests for cleaner terminal
    handler.log_message = lambda *args: None
    
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"✨ Server running at: http://localhost:{PORT}")
        httpd.serve_forever()

def main():
    print("=" * 60)
    print("       ♞ GRANDMASTER CHESS (BLUE - BLACK EDITION) ♞")
    print("=" * 60)
    print("  • Minimalist & Clean Piece Aesthetics")
    print("  • Deep Blue & Midnight Black Theme")
    print("  • Player vs Computer (AI) & 2-Player Pass-and-Play")
    print("  • Web Audio Tactile Sound Effects & Timers")
    print("=" * 60)
    
    # Start local background server
    t = threading.Thread(target=start_server, daemon=True)
    t.start()
    
    url = f"http://localhost:{PORT}/index.html"
    print(f"Opening browser at: {url}")
    time.sleep(0.5)
    webbrowser.open(url)
    
    print("\nPress Ctrl+C to stop the local server anytime.\n")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nExiting Grandmaster Chess. Enjoy!")
        sys.exit(0)

if __name__ == '__main__':
    main()
