# round_robin

1. Primer paso  
   Se registran los procesos que querramos que se ejecuten en el sistema operativo.

2. Segundo paso
   Al dar en iniciar se meteran todos los procesos en la cola de listos y en la memoria principal hasta que ya no se puedan meter mas procesos, esto estará condicionado por la memoria principal que tengamos.
   loadToMemory()

3. Tercer paso
   Si hay mas de un proceso en la cola de listos se pasará el primero a la sección de ejecución
   executeProcess()

Se usará un setInterval cada 1000ms

4. 