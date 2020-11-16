import React from 'react';
import {Feather} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import {View, Text ,Image,TouchableOpacity, Linking} from 'react-native';

import * as MailComposer from 'expo-mail-composer';

import LogoImg  from './../../assets/logo.png'
import style from './styles';
export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;
    const message = `Olá ${incident.name} estamos entrando em contado pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', 
            {style: 'currency', currency:'BRL'}
        ).format(incident.value)}`

    function goBack(){
        navigation.goBack();
    }

    //Abre o email através do botão
    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [`${incident.email}`],
            body: message,
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=+55${incident.whatsapp}&text=${message}`)
    }
    return(
        <View style={style.container}>
            <View style={style.header}>
                <Image source={LogoImg} />
                <TouchableOpacity onPress={goBack}>
                    <Feather name='arrow-left' size={28}  color='#E82041'/>
                </TouchableOpacity>
            </View>

            <View style={style.incident}>
                <Text style={[style.incidentProps, {marginTop: 0}]}>
                    ONG:
                </Text>
                <Text style={style.incidentValue}>
                    {incident.name} de {incident.city}/{incident.uf}
                </Text>

                <Text style={style.incidentProps}>
                    CASO:
                </Text>
                <Text style={style.incidentValue}>
                    {incident.title}
                </Text>

                <Text style={style.incidentProps}>
                    VALOR:
                </Text>
                <Text style={style.incidentValue}>
                        {Intl.NumberFormat('pt-BR', 
                                {style: 'currency', currency:'BRL'}
                            ).format(incident.value)}
                </Text>
            </View>

            <View style={style.contactBox}>
                <Text style={style.heroTitle}>
                    Salve o dia!
                </Text>
                <Text style={style.heroTitle}>
                    Seja o herói desse caso.
                </Text>

                <Text style={style.heroDescription}>
                    Entre em contato:
                </Text>

                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
                        <Text style={style.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.action} onPress={sendMail}>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
           
        </View>
    );
}