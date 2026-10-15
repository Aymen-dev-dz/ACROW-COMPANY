import os
from flask import Flask, render_template, request, flash, redirect, url_for, send_from_directory

app = Flask(__name__, static_folder='.', static_url_path='')
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "acrow_secret_key_2026_dz")

# Gmail SMTP configuration (optional, if credentials configured)
app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME=os.environ.get('MAIL_USERNAME', 'ghoriebmohamed9@gmail.com'),
    MAIL_PASSWORD=os.environ.get('MAIL_PASSWORD', 'rcgqhfgqeudhagrq'),
    MAIL_DEFAULT_SENDER=('ACROW DZ', 'ghoriebmohamed9@gmail.com')
)

try:
    from flask_mail import Mail, Message
    mail = Mail(app)
    mail_available = True
except ImportError:
    mail_available = False
    print("Notice: flask_mail not installed. Email sending will be simulated.")

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        subject = request.form.get('subject', 'Demande de contact')
        message = request.form.get('message')

        if not name or not email or not message:
            flash("❌ Veuillez remplir tous les champs obligatoires.", "danger")
            return redirect(url_for('home') + "#contact")

        if mail_available:
            try:
                msg = Message(
                    subject=f"Nouveau message de {name} - {subject}",
                    recipients=[app.config['MAIL_USERNAME']],
                    body=f"Nom: {name}\nEmail: {email}\nTéléphone: {phone}\nObjet: {subject}\n\nMessage:\n{message}"
                )
                mail.send(msg)
                flash("✅ Merci ! Votre message a été envoyé à l'équipe ACROW DZ.", "success")
            except Exception as e:
                flash(f"⚠️ Votre message a été enregistré (Notification mail: {str(e)})", "warning")
        else:
            flash("✅ Merci ! Votre message a été enregistré avec succès.", "success")

        return redirect(url_for('home') + "#contact")

    return render_template('index.html')

@app.route('/devis', methods=['GET', 'POST'])
def devis():
    if request.method == 'POST':
        try:
            name = request.form.get("name")
            company = request.form.get("company", "")
            email = request.form.get("email")
            phone = request.form.get("phone")
            prestation = request.form.get("prestation", "Vente")
            materiel = request.form.get("materiel")
            quantite = request.form.get("quantite")
            duree = request.form.get("duree", "")
            destination = request.form.get("destination")
            message = request.form.get("message", "")
            file = request.files.get("file")

            if mail_available:
                msg = Message(
                    subject=f"📑 Demande de devis ({prestation}) - {name} ({company})",
                    recipients=[app.config['MAIL_USERNAME']],
                    body=f"""
Prestation: {prestation}
Nom: {name}
Entreprise: {company}
Email: {email}
Téléphone: {phone}
Matériel souhaité: {materiel}
Quantité: {quantite}
Durée estimée: {duree}
Chantier (Wilaya): {destination}

Message & Remarques:
{message}
"""
                )
                if file and file.filename != "":
                    msg.attach(file.filename, file.content_type, file.read())

                mail.send(msg)

            flash("✅ Merci ! Votre demande de devis a été envoyée avec succès à nos ingénieurs.", "success")
        except Exception as e:
            flash(f"⚠️ Votre demande a été enregistrée avec succès.", "success")

        return redirect(url_for("devis"))

    return render_template("devis.html")

# Serve PDF files and E-Book reader
@app.route('/pdf/<path:filename>')
def serve_pdf(filename):
    return send_from_directory('pdf', filename)

@app.route('/ebook-reader.html')
def serve_reader():
    return send_from_directory('.', 'ebook-reader.html')

@app.route('/print-profile.html')
def serve_print():
    return send_from_directory('.', 'print-profile.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting ACROW DZ Server on http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)
