import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

html {
  font-family: "Montserrat", sans-serif;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
}
body {

}
h1 {
  color:#39393F ;
  font-family: Arial;
  line-height: 150px;
  font-size: 180px;
  font-weight: 800;
  text-align: center;
}
h3 {
font-family: Arial;
color:#39393F ;
  font-size: 40px;
  font-weight: 800;
  text-align: center;
}
a {
  text-decoration: none;
  color:#39393F ;
  transition:0.3s;
  &:hover{
    opacity:0.5;
    transition:0.3s;
  }
}

p {
  font-size:16px;
  color:#39393F ;
  text-align: justify;
}
#inputButton{
  display: none;
}




`;
