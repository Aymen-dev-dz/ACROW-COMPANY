import http.server
import socket
import socketserver
import os
import sys

class FastHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and optimize caching based on file type
        self.send_header('Access-Control-Allow-Origin', '*')
        path = self.path.split('?')[0].lower()
        if path.endswith('.html') or path.endswith('/'):
            self.send_header('Cache-Control', 'no-cache, must-revalidate')
        elif path.endswith(('.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.mp4', '.pdf', '.woff2', '.ttf')):
            self.send_header('Cache-Control', 'public, max-age=86400')
        else:
            self.send_header('Cache-Control', 'public, max-age=3600')
        super().end_headers()

class DualStackServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True

    def server_bind(self):
        try:
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        except (AttributeError, OSError):
            pass
        super().server_bind()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    PORT = 8080
    
    server_address = ('0.0.0.0', PORT)
    try:
        # Try dual-stack IPv4/IPv6
        server = DualStackServer(('::', PORT), FastHTTPRequestHandler)
    except Exception:
        server = DualStackServer(('0.0.0.0', PORT), FastHTTPRequestHandler)
        
    print(f"High-performance threaded server running on http://localhost:{PORT}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
