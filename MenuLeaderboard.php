<?php

session_start();
 require 'php/dbh.php';

?>

<script>
	$(document).ready(function () {


		$('.Regresar').on("click", function () {
			ShowPrincipal();
		});


	});

</script>



	<div class="container">



		<div class="row">
			<div class="Todo" style="background-image: url(Imagenes/FondoLeader.png)">
				<div class="container">

					<div class="row" style="margin-top: 15%;">

					<div class="col-12 text-center">
						<?php
							$sql = "select * 
							from users 
							order BY score DESC
							LIMIT 5";
							$result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));

						
							$emparray = array();
							while($row =mysqli_fetch_assoc($result))
							{
								$emparray[] = $row;
							}

							$arraysJSON = json_encode($emparray);


							if ($arraysJSON === false) {
							
							}

							$json_a = json_decode($arraysJSON, true);
							if ($json_a === null) {
							
							}

												
							foreach ($json_a as $person_name => $person_a) {
								$_UserName = $person_a['user'];
								$_UserScore= $person_a['score'];
			
			
		
							/*	echo <<<EOL
									
								<div class="text">$_UserName ...... $_UserScore </div>

								
								EOL;*/
								
								 echo '<div class="text">'.$_UserName.' ...... '.$_UserScore.'</div>';
						
							}

						?>
				
					</div>


					</div>



					<div class="row" style=" margin-top: 5%;">
						<div class="col-12 text-center">
							<a ref="javascript:void(0)" class="Regresar">
								<img src="Imagenes/BTNregresar.png" alt="" id="imgBTN" class="btnRegresar" />
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