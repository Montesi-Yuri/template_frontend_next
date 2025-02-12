import Image from 'next/image'

export default function Contact() {
	return (
		<section id="contact" className="py-20 w-full relative z-[1]">
			<div className="container mx-auto">
				<div className="max-w-7xl mx-auto px-4">
					<h2 className="text-3xl font-bold text-center text-ivory mb-12">Contattaci</h2>
					<p className="text-center text-ivory mb-12">
						Per qualsiasi domanda o richiesta, puoi contattarci tramite il form qui sotto.
						Ti risponderemo il prima possibile.
					</p>
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div className="hidden md:block relative">
							<div className="absolute inset-0 bg-gradient-to-br from-ivory/20 to-transparent dark:from-prussian-light/50 rounded-full blur-3xl" />
							<Image
								src="/images/contacts.svg"
								alt="Illustrazione contatti"
								width={500}
								height={500}
								className="w-full h-auto max-w-md mx-auto relative z-[1]"
								priority
							/>
						</div>
						<div className="max-w-md mx-auto w-full">
							<form className="space-y-6">
								<div>
									<label htmlFor="name" className="block text-sm font-medium mb-1 ms-1 text-ivory">Nome *</label>
									<input
										type="text"
										id="name"
										name="name"
										required
										className="input-field rounded-xl"
										placeholder="Inserisci il tuo nome"
									/>
								</div>
								<div>
									<label htmlFor="email" className="block text-sm font-medium mb-1 ms-1 text-ivory">Email *</label>
									<input
										type="email"
										id="email"
										name="email"
										required
										className="input-field rounded-xl"
										placeholder="esempio@email.com"
									/>
								</div>
								<div>
									<label htmlFor="company" className="block text-sm font-medium mb-1 ms-1 text-ivory">Azienda *</label>
									<input
										type="text"
										id="company"
										name="company"
										required
										className="input-field rounded-xl"
										placeholder="Nome della tua azienda"
									/>
								</div>
								<div>
									<label htmlFor="message" className="block text-sm font-medium mb-1 ms-1 text-ivory">Messaggio *</label>
									<textarea
										id="message"
										name="message"
										rows={4}
										className="input-field rounded-xl"
										placeholder="Scrivi qui il tuo messaggio..."
									></textarea>
								</div>
								<button type="submit" className="btn-primary w-full">Invia Richiesta</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
} 