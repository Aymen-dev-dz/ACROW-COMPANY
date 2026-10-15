import http.server
import socket
import socketserver
import os
import sys

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

class DualStackServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    address_family = socket.AF_INET6

    def server_bind(self):
        try:
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        except (AttributeError, OSError):
            pass
        super().server_bind()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    PORT = 8080
    try:
        httpd = DualStackServer(('::', PORT), NoCacheHTTPRequestHandler)
    except Exception:
        DualStackServer.address_family = socket.AF_INET
        httpd = DualStackServer(('0.0.0.0', PORT), NoCacheHTTPRequestHandler)
    print(f"Dual-stack zero-cache server running on http://localhost:{PORT}", flush=True)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
