import { ChangeEvent, FC, ReactNode, useEffect, useState } from "react";
import './styles.scss';
import { FiEdit2 } from "react-icons/fi";
import { useQuery } from "react-query";
import { useAppSelector } from "../../../../app/store";
import { DescApi } from "../../../../entities/description";
import { AiOutlineSend } from "react-icons/ai";
import { SharedUi } from "../../../../shared/sharedUi";

interface PropProps {
  propName: string,
  value: string | undefined,
  apiFunction: (prop: string) => Promise<void>,
  inputVal: string,
  setInputVal: React.Dispatch<React.SetStateAction<string>>,
  children: ReactNode | ReactNode[],
}
const Prop: FC<PropProps> = ({ value, propName, apiFunction, inputVal, setInputVal, children }) => {

  const [edited, setEdited] = useState<boolean>(false);
  const [val, setVal] = useState<string>('');
  // const [inputVal, setInputVal] = useState<string>('');

  const { data, isLoading, isError, refetch } = useQuery(
    ['edit' + propName, inputVal],
    () => {
      return apiFunction(inputVal);
    },
    {
      enabled: false,
    }
  ) 

  useEffect(() => {
    if (value) {
      setVal(value);
    }
  }, []);

  return (
    <div className="prop">
      <p className="name">{propName}</p>
      <span>
        {!edited ? (
          value || val ? <p className="value">
            {val}
          </p> : <p className="empty">
            Empty
          </p>
        ) : (
          <>
            {children}
            {isLoading ? (
              <SharedUi.Icons.Spinner size={18} />
            ) : (
              <button 
                className="white"
                onClick={() => refetch()
                  .then(() => {
                    setVal(inputVal);
                    setEdited(false);
                  })}
              >
                <AiOutlineSend size={18} />
              </button>
            )}
          </>
        )}
        <button 
          className="white"
          onClick={() => setEdited(!edited)}
        >
          <FiEdit2 size={18} />
        </button>
      </span>
    </div>
  )
}

interface DatePropProps {
  value: string | undefined,
}
const DateProp: FC<DatePropProps> = ({ value }) => {

  const [inputVal, setInputVal] = useState<string>('');

  return (
    <Prop
      propName="Date"
      apiFunction={DescApi.updateDate}
      value={value}
      inputVal={inputVal}
      setInputVal={setInputVal}
    >
      <input 
        type="text" 
        value={inputVal} 
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputVal(e.target.value)} 
      />
    </Prop>
  )
}

interface FSPProps {
  value: string | undefined,
}
const FamilyStatusProp: FC<FSPProps> = ({ value }) => {

  const [inputVal, setInputVal] = useState<string>('bachelor');

  return (
    <Prop
      propName="Family Status"
      apiFunction={DescApi.updateFamilyStatus}
      value={value}
      inputVal={inputVal}
      setInputVal={setInputVal}
    >
      <select
        value={inputVal}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setInputVal(e.target.value)}
      >
        <option value="bachelor" key={0}>Bachelor</option>
        <option value="married" key={1}>Married</option>
        <option value="divorced" key={2}>Divorced</option>
      </select>
    </Prop>
  )
}

interface WPProps {
  value: string | undefined,
}
const WorkProp: FC<WPProps> = ({ value }) => {

  const [inputVal, setInputVal] = useState<string>('');

  return (
    <Prop
      propName="Work"
      apiFunction={DescApi.updateWork}
      value={value}
      inputVal={inputVal}
      setInputVal={setInputVal}
    >
      <input 
        type="text" 
        value={inputVal} 
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputVal(e.target.value)} 
      />
    </Prop>
  )
}

interface TPProps {
  value: string | undefined,
}
const TelephoneProp: FC<TPProps> = ({ value }) => {

  const [inputVal, setInputVal] = useState<string>('');

  return (
    <Prop
      propName="Telephone"
      apiFunction={DescApi.updateTelephone}
      value={value}
      inputVal={inputVal}
      setInputVal={setInputVal}
    >
      <input 
        type="text" 
        value={inputVal} 
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputVal(e.target.value)} 
      />
    </Prop>
  )
}

interface QPProps {
  value: string | undefined,
}
const QuoteProp: FC<TPProps> = ({ value }) => {

  const [inputVal, setInputVal] = useState<string>('');

  return (
    <Prop
      propName="Quote"
      apiFunction={DescApi.updateQuote}
      value={value}
      inputVal={inputVal}
      setInputVal={setInputVal}
    >
      <textarea
        className="text-quote"
        name="quote" 
        value={inputVal} 
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputVal(e.target.value)}
      />
    </Prop>
  )
}

export const ChangeDescWindow: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const { data, isLoading, isError } = useQuery(
    ['loadUserDesc', user?.id],
    () => {
      if (user) {
        return DescApi.getDesc();
      }
    }
  )

  if (isLoading) {
    return (
      <div className="loader">
        <SharedUi.Icons.Spinner size={50} />
      </div>
    )
  }

  if (!data) {
    return (
      <div>
        No data
      </div>
    )
  }

  return (
    <div className="regular-panel change-desc-window">
      <div className="section header-section">
        <h3>Change Description</h3>
      </div>
      <hr/>
      <div className="section main">
        <DateProp value={data.date} />
        <FamilyStatusProp value={data.familyStatus} />
        <WorkProp value={data.work} />
        <TelephoneProp value={data.telephone} />
        <QuoteProp value={data.quote} />
      </div>
    </div>
  )
}