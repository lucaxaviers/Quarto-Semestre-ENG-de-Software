public class Horario
{
    private byte hora, minuto, segundo;

    public /*void*/ Horario (byte hora, byte minuto, byte segundo) throws Exception
    {
        this.hora = hora;
        this.minuto = minuto;
        this.segundo = segundo;
    }

    public void setHora (byte hora) throws Exception
    {
        if(hora < 0 || hora > 23)
        {
            throw new Exception("Hora inválida");
        }
        this.hora = hora;
    }

    public void setMinuto (byte minuto) throws Exception
    {
        if(minuto < 0 || minuto > 59)
        {
            throw new Exception("Minuto inválido");
        }
        this.minuto = minuto;
    }

    public void setSegundo (byte segundo) throws Exception
    {   
        if(segundo < 0 || segundo > 59)
        {
            throw new Exception("Segundo inválido");
        }
        this.segundo = segundo;
    }

    public byte getHora ()
    {
        return this.hora;
    }

    public byte getMinuto ()
    {
        return this.minuto;
    }

    public byte getSegundo ()
    {
        return this.segundo;
    }

    public void adiante (int qtdSegundos) throws Exception
    {
        if(qtdSegundos + segundo >= 60)
        {
            int totalSegundos = qtdSegundos + segundo;
            byte minutosAdicionais = (byte) (totalSegundos / 60);
            byte segundosRestantes = (byte) (totalSegundos % 60);
            this.minuto += minutosAdicionais;
            this.segundo = segundosRestantes;
        }
        else
        {
            this.segundo += (byte) qtdSegundos;
        }
        
    }

    public void retroceda (int qtdSegundos) throws Exception
    {
        int totalSegundos = (this.hora * 3600) + (this.minuto * 60) + this.segundo;
        totalSegundos -= qtdSegundos;
        
        if (totalSegundos < 0) {
            totalSegundos = 0;
        }

        this.hora = (byte) ((totalSegundos / 3600));
        this.minuto = (byte) ((totalSegundos % 3600) / 60);
        this.segundo = (byte) (totalSegundos % 60);
    }

    public Horario getHorarioFuturo (int qtdSegundos) throws Exception // nao altera o this
    {
        Horario futuro = new Horario(this.hora, this.minuto, this.segundo);
        futuro.adiante(qtdSegundos);
        return futuro;
    }

    public Horario getHorarioPassado (int qtdSegundos) throws Exception // nao altera o this
    {
        Horario passado = new Horario(this.hora, this.minuto, this.segundo);
        passado.retroceda(qtdSegundos);
        return passado;
    }

}