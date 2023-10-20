import React from 'react';
// import utilStyles from '../../utils.module.scss';

export default function IconLink({ href = '', onClick, Icon, title, label, ...props }) {

  const utilStyles = {}

  return (
    <a className={`${utilStyles.link}group flex`} href={href} onClick={onClick} title={title ? title : 'New'} {...props}>
      {label && <span>{label}</span>}
      <Icon className="h-6 w-6 transition-transform duration-300 active:scale-95 group-hover:scale-[120%] group-hover:duration-75" />
    </a>
  );
};
