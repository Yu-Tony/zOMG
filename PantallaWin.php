<script>
	$(document).ready(function () {


		$('.Regresar').on("click", function () {
			hideScore();
			ShowPrincipal();
		});

	});



</script>



	<div class="container">



		<div class="row">
			<div class="Todo" style="background-image: url(Imagenes/Fondo.png)">
				<div class="container">


					<div class="row" style="margin-top: 1%">
						<div class="col-12 text-center">
						  <img src="Imagenes/TextGanaste.png" alt="" class="btnRegresar"/>
						</div>
					  </div>

					<div class="row" style="margin-top: 8%;">
						<div class="col-12 text-center">
							
							<p class="text"> Puntuacion: </p>
							<p class="text" id="scoreTextWin">  </p>
                            <button onclick="shareFB();">Compartir en Facebook</button>

						</div>


					</div>

                    <div class="row" style=" margin-top: 15%;">
						<div class="col-12 text-center">
							<a ref="javascript:void(0)" class="Regresar">
								<img src="Imagenes/BTNjugarAgain.png" alt="" id="imgBTN" class="btnRegresar" />
							</a>
						</div>
					</div>

					<div class="row" style=" margin-top: 1%;">
						<div class="col-12 text-center">
							<a ref="javascript:void(0)" class="Regresar">
								<img src="Imagenes/salir.png" alt="" id="imgBTN" class="btnRegresar" />
							</a>
						</div>
					</div>

				</div>



			</div>
		</div>

	</div>


	</div>

<style>
	.Todo {
		background-image: url(Imagenes/FondoLeader.png);
	}



</style>