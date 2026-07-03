import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { HeaderContainer, TitleActionBox, TitleTypography, UserInfoContainer, UserDetailsBox, RoleTypography } from './HeaderModulo.styles';
import { AuthContext } from '../../application/context/AuthContext';

// COMPONENT PATTERN
// define el componente HeaderModulo para el título, perfil del usuario y acciones
export const HeaderModulo = ({ titulo, action }) => {
  const { currentUser } = useContext(AuthContext); // obtiene el usuario logueado para mostrar su rol y correo

  return (
    <HeaderContainer>
      <TitleActionBox>
        <TitleTypography variant="h4">
          {titulo}
        </TitleTypography>
        {action}
      </TitleActionBox>
      <UserInfoContainer>
        <UserDetailsBox>
          <RoleTypography variant="subtitle1">
            {currentUser?.role ? currentUser.role.toLowerCase() : "Cargando..."}
          </RoleTypography>
          <Typography variant="body2" color="text.secondary">
            {currentUser?.email || "Cargando..."}
          </Typography>
        </UserDetailsBox>
      </UserInfoContainer>
    </HeaderContainer>
  );
};
