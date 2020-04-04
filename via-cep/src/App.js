import React from "react"
import "./App.css"

function App() {
	const [cep, setCep] = React.useState("")
	const [address, setAddress] = React.useState(undefined)

	function regexCep() {
		setCep(cep.replace(/[\(\)\.\s-]+/g, ""))
	}

	async function viaCep() {
		regexCep()
		const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
		const result = await response.json()
		setAddress(result)
	}

	return (
		<>
			<div>
				<form>
					<input
						type='text'
						value={cep}
						onChange={(event) => setCep(event.target.value)}
						name='register-cep'
						id='register-cep'
					/>
					<button
						className='button-search'
						onClick={viaCep}
						type='button'
					>
						Pesquisar CEP
					</button>
				</form>
			</div>
			<div>
				{address ? (
					<div className='card'>
						<p className='title-card'>Endereço encontrado</p>
						<div className='content'>
							<p>
								<strong>CEP: </strong>
								{address.cep}
							</p>
							<p>
								<strong>Logradouro: </strong>
								{address.logradouro}
							</p>
							{address.complemnto ? (
								<p>
									<strong>Complemento: </strong>
									{address.complemento}
								</p>
							) : (
								""
							)}
							<p>
								<strong>Bairro: </strong>
								{address.bairro}
							</p>
							<p>
								<strong>Localidade: </strong>
								{address.localidade}
							</p>
							<p>
								<strong>Estado: </strong>
								{address.uf}
							</p>
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</>
	)
}

export default App
