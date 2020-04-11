import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../Services/api';
import './style.css';

import logoimg from '../../assets/logo.svg';

export default function Profile(){
    const navegarTo = useHistory();
    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    useEffect(()=>{
        api.get('/profiles', {headers:{
                Authorization: ongId
            }}).then(response =>{
                setIncidents(response.data);
            });
    }, [ongId]);
    function Logout(){
        localStorage.clear();
        navegarTo.push('/');
    };
   async function DeleteIncident(id){
        try {
          await api.delete(`/incidents/${id}`,{
              headers: {
                Authorization: ongId,
              }
          });

          setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert("Erro ao excluir, tente novamente");
        }
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoimg} alt="Be the hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={Logout}  type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
              {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>
                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-br',{style: 'currency', currency:"BRL"}).format(incident.value)}</p>

                    <button onClick={() => DeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
              ))}
            </ul>
        </div>
    );
}