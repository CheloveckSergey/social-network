import { FC, ReactNode } from "react";
import { BsThreeDots } from "react-icons/bs";
import './styles.scss';
import { Hook } from "../../types";
import { IconType } from "react-icons/lib";
import { SharedUi } from "..";

///////////////////////////////////////////////////////////////////

interface FLProps<Entity, Effects> {
  entity: Entity,
  hook: Hook<Entity, Effects>,
  effects: Effects,
}
const FeatureLine = function<Entity, Effects>({ entity, hook, effects } : FLProps<Entity, Effects>) {

  const { refetch, isLoading, isError, headline, isSuccess } = hook(entity, effects);

  return (
    <h4 
      className="feature-line"
      onClick={() => refetch()}
    >
      <span className="headline">
        {headline}
      </span>
      <span className="status">
        {isLoading && <SharedUi.Icons.Spinner size={15} />}
        {isError && 'E'}
      </span>
    </h4>
  )
}

interface ESProps<Entity, Effects> {
  entity: Entity,
  hooks: Hook<Entity, Effects>[],
  effects: Effects,
}
const ExtraSection = function<Entity, Effects>({ entity, hooks, effects } : ESProps<Entity, Effects>) {

  return (
    <div className="extra-section-button">
      <button className="white">
        <BsThreeDots size={25}/>
      </button>
      <div className="extra-user-panel extra-panel">
      {hooks.map((hook, index) => <FeatureLine<Entity, Effects>
        key={index}
        hook={hook}
        entity={entity}
        effects={effects}
      />)}
    </div>
    </div>
  )
}

///////////////////////////////////////////////////////////////////////////////

interface CABProps {
  onClick: () => void,
  Icon: IconType,
  iconSize?: number,
  isActive: boolean,
  activeColor: string,
  generalNumber: number,
  isLoading: boolean,
  isError: boolean,
  
}
const CreationActionButton: FC<CABProps> = ({ 
  onClick, 
  Icon,
  iconSize = 25,
  isActive, 
  activeColor, 
  generalNumber,
  isLoading,
  isError,
}) => {

  return (
    <button 
      className='creation-action-button'
      onClick={onClick}
    >
      {isLoading ? (
        <SharedUi.Icons.Spinner size={iconSize} />
      ) : isError ? (
        <div>asdf</div>
      ) : (
        <Icon 
          size={iconSize} 
          style={{color: `${isActive ? activeColor : ''}`}} 
        />
      )}
      <p className="extra">{generalNumber}</p>
    </button>
  )
}

interface EBProps {
  Icon: IconType,
  iconSize?: number,
  children: ReactNode | ReactNode[],
  panelClass?: string,
}
const ExtraButton: FC<EBProps> = ({ Icon, children, iconSize = 25, panelClass }) => {

  return (
    <div className="extra-section-button">
      <button className="white">
        <Icon size={iconSize}/>
      </button>
      <div className={`extra-user-panel extra-panel ${panelClass}`}>
        {children}
      </div>
    </div>
  )
}

interface BWESProps {
  name: string,
  children: React.ReactNode | React.ReactNode[],
  buttonClass: string,
  onClick?: () => void,
}
const ButtonWithExtraSection: FC<BWESProps> = ({ name, children, buttonClass, onClick }) => {

  return (
    <div className="extra-section-button">
      <button 
        className={`${buttonClass}`}
        onClick={onClick}
      >
        {name}
      </button>
      <div className={`extra-user-panel `}>
        {children}
      </div>
    </div>
  )
}

interface ELProps {
  body: React.ReactNode | React.ReactNode[],
  isLoading: boolean,
  isError: boolean,
  onClick: () => void,
}
const ExtraActionLine: FC<ELProps> = ({ body, isLoading, isError, onClick }) => {

  return (
    <button
      className="extra-line to-gray-back"
      onClick={onClick}
    >
      <SharedUi.Helpers.LoadErrorHandler
        isLoading={isLoading}
        isError={isError}
      >
        {body}
      </SharedUi.Helpers.LoadErrorHandler>
    </button>
  )
}

interface EXBProps {
  buttons: React.ReactNode[],
}
const ExtraActionsButton: FC<EXBProps> = ({ buttons }) => {
  
  return (
    <SharedUi.Buttons.ExtraButton
      Icon={BsThreeDots}
      panelClass="extra-actions-panel"
    >
      {buttons}
    </SharedUi.Buttons.ExtraButton>
  )
}

interface BWBProps {
  isLoading: boolean,
  isError: boolean,
  className: string,
  body: string,
  spinnerSize?: number,
  onClick: () => void,
}
const BynareWhiteButton: FC<BWBProps> = ({ isLoading, isError, className, body, spinnerSize = 15, onClick }) => {

  if (isLoading) {
    return (
      <button className={`bynare-white-button loading ${className}`}>
        <SharedUi.Icons.Spinner size={spinnerSize} />
      </button>
    )
  }

  return (
    <button 
      className={`bynare-white-button white-back ${className}`}
      onClick={onClick}
      disabled={isLoading || isError}
    >
      {body}
    </button>
  )
}

export const Buttons = {
  CreationActionButton,
  ExtraSection,
  ExtraButton,
  ButtonWithExtraSection,
  BynareWhiteButton,
  ExtraActionsButton,
  ExtraActionLine,
}