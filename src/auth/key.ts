//nota: questa chiave è stata creata con un sistema di generazione a 256bit(64caratteri) in hex. Questa key deve essere protetta in ambienti reali e non simulati, inserendola dentro un .env (enviroment) in modo che sia di difficile accesso. Per fini didattici la lascio qui, in modo tale che posso far vedere che so come funziona la secret key.
export const SECRET_KEY:string = "84c888a535c705296de5c9cff5c43d9e1aa30239a3148716f59c838d6900995ad79c28af2e82af831359e5c23e5b6c1a4ea91b4485968ac86a55aabfe8957841"


//Authorization: Bearer <your-jwt-token> <---andrà nell'header del front end dopo aver fatto il login per potersi muovere tra le rotte.