# À FAIRE
Supprimer user  
Logout  
...  

# pseudo code createUser
1. Récupérer la request (vérifier si les paramètres sont non nuls) → 400 
2. Vérifier si l’utilisateur existe → 409
3. insertion de l’utilisateur (avec /src/entties/user.js create() ) → erreur BD 
4. Renvoyer 201 si tout est ok et le message associé
 
# pseudo code de login
1. vérifie request / params (400)
2. user existe pas (401)
3. paswdd existe pas (401)
4. génère la session
5. retourne la clé en json
```
userExist(login) 
checkpassword(login, passwd)
```