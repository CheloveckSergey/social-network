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

////////////////////////////////////////////////////////////////////////////

interface BWESProps {
  body: string | React.ReactNode | React.ReactNode[],
  children: React.ReactNode | React.ReactNode[],
  buttonClass?: string,
  panelClass?: string,
}
const ButtonWithExtraSection: FC<BWESProps> = ({ body, children, buttonClass, panelClass }) => {

  return (
    <div className="extra-section-button">
      <button 
        className={`${buttonClass}`}
      >
        {body}
      </button>
      <div className={`extra-panel ${panelClass}`}>
        {children}
      </div>
    </div>
  )
}

interface ALProps {
  children: React.ReactNode | React.ReactNode[],
  className?: string,
  onClick: () => void,
}
const ExtraLine: FC<ALProps> = ({ children, className, onClick }) => {

  return (
    <button
      className={`extra-line to-gray-back ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
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
    <ExtraLine
      onClick={onClick}
    >
      <SharedUi.Helpers.LoadErrorHandler
        isLoading={isLoading}
        isError={isError}
      >
        {body}
      </SharedUi.Helpers.LoadErrorHandler>
    </ExtraLine>
  )
}

interface EXBProps {
  buttons: React.ReactNode[],
}
const ExtraActionsDotButton: FC<EXBProps> = ({ buttons }) => {
  
  return (
    <SharedUi.Buttons.ButtonWithExtraSection
      body={<BsThreeDots size={25} />}
      buttonClass="white"
    >
      {buttons}
    </SharedUi.Buttons.ButtonWithExtraSection>
  )
}

//////////////////////////////////////////////////////////////////////

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

interface WBBProps {
  body: string,
  isLoading: boolean,
  isError: boolean,
  className: string,
  spinnerSize?: number,
  onClick: () => void,
} 
const WhiteBackButton: FC<WBBProps> = ({ isLoading, isError, className, body, spinnerSize = 15, onClick }) => {

  if (isLoading) {
    return (
      <button className={`white-back-button loading ${className}`}>
        <SharedUi.Icons.Spinner size={spinnerSize} />
      </button>
    )
  }

  return (
    <button 
      className={`white-back-button white-back ${className}`}
      onClick={onClick}
      disabled={isError}
    >
      {body}
    </button>
  )
}

export const Buttons = {
  CreationActionButton,
  ExtraSection,
  ButtonWithExtraSection,
  BynareWhiteButton,
  ExtraActionsDotButton,
  ExtraLine,
  ExtraActionLine,
  WhiteBackButton,
}