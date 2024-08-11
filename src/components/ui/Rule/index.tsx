import styles from './index.module.css'

function Rule() {
	return (
		<div className={styles.text}>
			<p>〜ルール〜</p>
			<p>
				1,画面にスマホを向け、ポインタの位置を確認(1回につき3発のコルク玉が渡されます)
				<br />
				2,狙いを目掛けてスマホのトリガーボタンを押すと当たればGetです
				<br />
				3,結果はぜひSNSでポストしてね
			</p>
		</div>
	);
}

export default Rule;
