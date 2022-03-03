var cookie = require('cookie');
export default async (req,res) =>{
  if(req.method === 'GET'){
    if(!req.headers.cookie){
      res.status(403).json({message:'Not Authorized'})
      return
    }
    const {token} = cookie.parse(req.headers.cookie)
    const strapiRes = await fetch('http://localhost:1337/api/users/me',{
      method: 'POST',
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    const user = await strapiRes.json()
    if (!strapiRes.ok) {
      res.status(200).json({user})
    }else{
      res.status(403).json({message:'User Forbidden'})
    }
  }
  else{
    res.setHeader('Allow', ['GET'])
    res.status(405).json({message: `method ${req.method} not allowed`})
  }
}