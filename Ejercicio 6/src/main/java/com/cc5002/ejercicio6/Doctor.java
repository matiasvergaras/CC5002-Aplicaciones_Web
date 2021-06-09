package com.cc5002.ejercicio6;

public class Doctor {

    private String nombre;
    private String exp;
    private String region;
    private String comuna;
    private String especialidad;
    private String twitter;
    private String email;
    private String celular;

    public Doctor(
            String nombre, String exp, String region,
            String comuna, String especialidad,
            String twitter, String email, String celular
    ) {
        this.nombre = nombre;
        this.exp = exp;
        this.region = region;
        this.comuna = comuna;
        this.especialidad = especialidad;
        this.twitter = twitter;
        this.email = email;
        this.celular = celular;
    }

    public String getNombre() {
        return nombre;
    }

    public String getExp() {
        return exp;
    }

    public String getRegion() {
        return region;
    }

    public String getComuna() {
        return comuna;
    }

    public String getEspecialidad() {
        switch(especialidad){
            case "1": return "Cardiología";
            case "2": return "Gastroenterología";
            case "3": return "Endocrinología";
            case "4": return "Epidemiología";
            case "5": return "Geriatría";
            case "6": return "Hematología";
            case "7": return "Medicina del Deporte";
            case "8": return "Medicina de urgencias";
            case "9": return "Medicina interna";
            case "10": return "Nefrología";
            case "11": return "Neumología";
            case "12": return "Neurología";
            case "13": return "Nutriología";
            case "14": return "Oncología";
            case "15": return "Pediatría";
            case "16": return "Psiquiatría";
            case "17": return "Reumatología";
            case "18": return "Toxicología";
            case "19": return "Dermatología";
            case "20": return "Ginecología";
            case "21": return "Oftalmología";
            case "22": return "Cardiología";
            case "23": return "Otorrinolaringología";
            case "24": return "Urología";
            case "25": return "Traumatología";

        }
        return especialidad;
    }

    public String getTwitter() {
        return twitter;
    }

    public String getEmail() {
        return email;
    }

    public String getCelular() {
        return celular;
    }
}