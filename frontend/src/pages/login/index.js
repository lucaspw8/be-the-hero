import React, {useState} from 'react';
import './styles.css'
import LogoImg from '../../assets/logo.svg';
import HeroesImg from '../../assets/heroes.png';
import {FiLogIn} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import api from '../../Services/api';

export default function Login(){

    const [id, setId] = useState('');
    const navegarTo = useHistory();
    async function login(e){
        e.preventDefault();
        try {
            const response = await api.post('sessions', {id});
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            navegarTo.push('/profile')

        } catch (error) {
            alert("Falha no login, Tente novamente");
            console.error(error);
        }
    }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={LogoImg} alt="Be the Hero"/>

                <section>
                    <form onSubmit={login}>
                        <h1>Faça seu logon</h1>
                        <input 
                            type="text" 
                            placeholder="Sua ID" 
                            value={id}
                            onChange={e => setId(e.target.value)}
                        />
                        <button className="button" type="submit">Entrar</button>
                        <Link className="back-link " to="/register">
                           <FiLogIn size={16} color="#E02041"/>
                            Não tenho cadastro
                        </Link>
                    </form>
                </section>
            </section>

            <img src={HeroesImg} alt="Heroes"/>
        </div>
    );
}