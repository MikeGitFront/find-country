import { useEffect, useState } from 'react';
import './App.css';
import { useQuery } from '@apollo/client'
import Item from './components/Item';
import { Input, Select, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { GET_COUNTRIES } from './graphql/countriesQuery';
import { IItem } from './interfaces/itemInterface';



const App: React.FC = () => {
  const { loading, data } = useQuery(GET_COUNTRIES)
  const [standartValues, setStandartValues] = useState<IItem[]>([])
  const [selectedValue, setSelectedValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [values, setValues] = useState<IItem[]>([])
  const [options] = useState([
    { value: 'All' },
    { value: 'Europe' },
    { value: 'Asia' },
    { value: 'North America' },
    { value: 'South America' },
    { value: 'Oceania' },
    { value: 'Africa' },
    { value: 'Antarctica' },
  ])

  const { Search } = Input
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  useEffect(() => {
    if (!loading) {
      setStandartValues(data.countries)
      setValues(data.countries)
    }
  }, [data, loading])

  const changeValue = (value: string) => {
    setSearchValue('')
    if (value === 'All') {
      setValues(standartValues)
    }
    else {
      const newValues = standartValues.filter(item => item.continent.name === value)
      setValues(newValues)
    }
    setSelectedValue(value)
  }


  const onSearch = (value: string) => {
    if (value.trim() === '') {
      return false
    }
    if ((value.trim() !== '' && selectedValue === '') || (value.trim() !== '' && selectedValue === 'All')) {
      const filteredValues = standartValues.filter(item => {
        return item.name.toLowerCase() === value.toLowerCase() || item.code.toLowerCase() === value.toLowerCase()
      })
      let data
      if (value.length > 2) {
        data = standartValues.filter(item => {
          return item.name.toLowerCase().includes(value.toLowerCase())
        })
        setValues(data)
      }
      else {
        setValues(filteredValues)
      }
    }
    else if (value.trim() !== '' && (selectedValue !== '' || 'All')) {
      const filteredValues = values.filter(item => {
        return (item.continent.name === selectedValue && item.name.toLowerCase() === value.toLowerCase()) || (item.continent.name === selectedValue && item.code.toLowerCase() === value.toLowerCase())
      })
      let data
      if (value.length > 2) {
        data = standartValues.filter(item => {
          return item.name.toLowerCase().includes(value.toLowerCase()) && item.continent.name === selectedValue
        })
        setValues(data)
      }
      else {
        setValues(filteredValues)
      }
    }
    else {
      setValues(standartValues)
    }

  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      selectedValue === '' ? setValues(standartValues) : changeValue(selectedValue)
      setSearchValue('')
    }
    else {
      if (values.length === 0) {
      }
      setSearchValue(e.target.value)
    }
  }

  return (

    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Country Finder</h1>

        <Select
          defaultValue={"Choose continent"}
          style={{ marginBottom: '10px', minWidth: '160px' }}
          onChange={(value) => changeValue(value)}
        >
          {options.map(option => <Select.Option key={option.value} value={option.value}>{option.value}</Select.Option>)}
        </Select>
        <Search
          value={searchValue}
          placeholder="Find country by name or ISO code..."
          onSearch={onSearch}
          onChange={onInputChange}
          style={{ width: 300, marginBottom: 10 }} />
        {loading && <Spin indicator={antIcon} ></Spin>}
        {(values.length === 0 && !loading) && <h2>No results for {searchValue} {selectedValue !== '' ? `in ${selectedValue}` : null}</h2>}
        <div className='container'>
          {values.length !== 0
            && values.map(item =>
              <Item
                key={item.name}
                emoji={item.emoji}
                code={item.code}
                name={item.name}
                continent={item.continent.name}></Item>)
          }
        </div>
      </div>
    </div>
  );
}

export default App;

