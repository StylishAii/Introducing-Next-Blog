import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  token: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  token
}:{
    name:string,
    token:string
}) => (
  <div>
    <h1>Hello {name}, please activate your account by clicking this link {process.env.NEXTAUTH_URL}/activate/${token}</h1>
  </div>
);
