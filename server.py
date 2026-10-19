import http.server
import os
import sys

class FastHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        path = self.path.split('?')[0].lower()
        if path.endswith(('.html', '/')) or not path:
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        elif path.endswith(('.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.mp4', '.pdf', '.woff2', '.ttf')):
            self.send_header('Cache-Control', 'public, max-age=86400')
        else:
            self.send_header('Cache-Control', 'public, max-age=3600')
        super().end_headers()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    PORT = 8080
    server_address = ('', PORT)
    httpd = http.server.ThreadingHTTPServer(server_address, FastHTTPRequestHandler)
    print(f"ACROW Fast Server running on http://localhost:{PORT}", flush=True)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
