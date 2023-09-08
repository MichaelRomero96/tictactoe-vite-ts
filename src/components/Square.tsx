interface SquareProps {
	handleClick: (index: number) => void;
	value: GameValue;
	index: number;
	winnerPattern: Pattern | undefined;
}


const Square = ({ value, index, handleClick, winnerPattern }: SquareProps) => {
	// evaluates if the square is played, set blue color for X and red color for O
	const getPlayerColor = () => {
		if (Boolean(winnerPattern)) {
			for (const pattern of winnerPattern!) {
				if (index === pattern) {
					return 'green'
				}
			}
		};
		const isX = () => {
			if (value === 'X') {
				return 'blue'
			} else if (value === 'O') {
				return 'red'
			}
			return 'purple'
		};
		return isX();
	}
	return (
		<div onClick={() => handleClick(index)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 100, height: 100, border: `5px solid ${getPlayerColor()}`, margin: '5px', borderRadius: '5px', fontSize: '30px', color: getPlayerColor(), cursor: 'pointer' }}>{value}</div>
	)
}

export default Square