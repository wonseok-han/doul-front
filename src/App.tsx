const App: React.FC = () => {
  interface Test {
    [key: string]: string;
    name: string;
    value: string;
  }
  const sum = () => {
    const aa: Test = { name: 'aa', value: '1' };
    const bb: Test[] = [aa];

    for (const [item, value] of Object.entries(aa)) {
      console.log(item, value, aa[item]);
    }

    for (const x of bb) {
      console.log(x);
    }
  };
  return (
    <div>
      <button onClick={() => sum()}>테스트</button>
    </div>
  );
};

export default App;
