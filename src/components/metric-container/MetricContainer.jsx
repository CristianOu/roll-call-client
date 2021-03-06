import '../../App.css';

function MetricContainer({ title, percentage }) {
  const styles = {
    outerContainer: {
      display: 'flex',
      flexDirection: 'row',
      height: 120,
      width: 280,
      justifyContent: 'space-between',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      alignItems: 'center'
    },
    percentageContainer: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 10
    },
    percentageTitle: {
      fontSize: 16
    },
    fillBarStyle: {
      position: 'absolute',
      border: '0.08em solid #307bbb',
      width: '0.84em',
      height: '0.84em',
      clip: 'rect(0em, 0.5em, 1em, 0em)',
      borderRadius: '50%',
      borderColor: '#44C13C'
    }
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.percentageContainer}>
        <span style={styles.percentageTitle}>{title}</span>
        <span>{`${percentage}%`}</span>
      </div>
      <div className="c100" style={{ backgroundColor: '#E6FBD9' }}>
        <span>
          {/*<img src={require(`./images/${iconName}.png`)} style={{width: 20, height: 20}} alt={''}/>*/}
        </span>
        <div
          className="slice"
          style={{ clip: percentage > 50 && 'rect(auto, auto, auto, auto)' }}
        >
          <div
            className="bar"
            style={{
              ...styles.fillBarStyle,
              transform: `rotate(${3.6 * percentage}deg)`
            }}
          />
          <div
            className="fill"
            style={{
              ...(percentage > 50 && styles.fillBarStyle),
              transform: percentage > 50 && 'rotate(180deg)'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MetricContainer;
