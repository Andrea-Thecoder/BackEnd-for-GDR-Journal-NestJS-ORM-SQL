import { createParamDecorator, ExecutionContext } from '@nestjs/common';


//Ho creato questo decoratore per estrapolare l'id dell'utente attualmente connesso ed autentificato. 
//il JWT infatti contiene le info dell'user autenticato, quindi da qui possiamo prendere l'id, in mod oche non serva più passarlo come parametro. Questo sistema non solo automatizza il processo di assocaizioen ID -> request ma offre maggiore sicurezza in quanto l'id non sarà più visibile nell'url. Inoltre non sarà piu possibile entrare con un utente A e spostarsi, tramite url, verso altri utenti manipolando la parte dell'url dove contiene l'id.
export const User = createParamDecorator(
  (data: keyof any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user; // Se `data` è fornito, restituisce quel campo specifico
  },
);