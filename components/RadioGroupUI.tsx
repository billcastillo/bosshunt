import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { BOSS_TYPES, SCHOOLS } from "../config";
import Image from "next/image";

const plans = [
	{
		name: "Startup",
		ram: "12GB",
		cpus: "6 CPUs",
		disk: "160 GB SSD disk",
	},
	{
		name: "Business",
		ram: "16GB",
		cpus: "8 CPUs",
		disk: "512 GB SSD disk",
	},
	{
		name: "Enterprise",
		ram: "32GB",
		cpus: "12 CPUs",
		disk: "1024 GB SSD disk",
	},
];

type LocationProps = {
	name: string;
	id: string;
	schoolType?: string;
};

type BossDataProps = {
	name: string;
	id: string;
	respawn_time: number;
	schools?: boolean;
	locations: Array<LocationProps>;
};

type RadioGroupOptionProps = BossDataProps & {
	location: LocationProps;
	children: React.ReactNode;
};

const RadioGroupOption = ({
	id,
	children,
	location,
}: RadioGroupOptionProps) => {
	return (
		<RadioGroup.Option
			value={`${id}_${location.id}`}
			className='p-2 hover:cursor-pointer h-full w-full grid place-items-center bg-bir-red rounded-lg sm:rounded-xl shadow-bottom-red'
		>
			{({ checked }) => (
				<div className={checked ? "bg-blue-200" : ""}>{children}</div>
			)}
		</RadioGroup.Option>
	);
};

type FakeRadioButton = BossDataProps & {
	setDefaultLocation: Function;
};

const FakeRadioButton = ({ name, setDefaultLocation }: FakeRadioButton) => {
	return (
		<div
			className='row-span-5 grid place-items-center rounded-xl hover:cursor-pointer'
			onClick={() => setDefaultLocation()}
		>
			<span className='text-2xl'>{name}</span>
		</div>
	);
};

const SchoolRadioGroup = (props: BossDataProps) => {
	const { locations } = props;

	return (
		<div className='row-span-4 inline-grid grid-flow-col auto-cols-fr place-content-around gap-4'>
			{locations.map((location, index) => {
				const schoolData = SCHOOLS[location.schoolType];
				return (
					<div key={index} className='aspect-square bg-bir-red rounded-xl'>
						<RadioGroupOption {...props} location={location}>
							<Image
								src={schoolData.imageUrl}
								width='40'
								height='40'
								alt={schoolData.name}
							/>
						</RadioGroupOption>
					</div>
				);
			})}
		</div>
	);
};

const ListBossLocations = (props: BossDataProps) => {
	const { locations } = props;

	return (
		<div className='row-span-4 grid grid-cols-1 grid-rows-2 gap-4  rounded-xl'>
			{locations.map((location) => {
				return (
					<div key={location.id}>
						<RadioGroupOption {...props} location={location}>
							{location.name}
						</RadioGroupOption>
					</div>
				);
			})}
		</div>
	);
};

export default function MyRadioGroup() {
	let [plan, setPlan] = useState("startup");

	return (
		<RadioGroup value={plan} onChange={setPlan} name='bossType'>
			<RadioGroup.Label>1. Select a boss</RadioGroup.Label>

			<div className='w-full inline-grid grid-flow-row grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6'>
				{BOSS_TYPES.map((boss) => {
					if (boss.locations.length > 1) {
						// create fake radio button
						// loop thru locations
						// if condition to know if school or not, loop thru schools
						// loop thru other locations
						return (
							<div
								key={boss.id}
								className='text-center grid grid-cols-1 grid-rows-13 gap-2 mr-6 mb-6 w-full sm:aspect-[4/3]'
							>
								<FakeRadioButton
									{...boss}
									setDefaultLocation={() =>
										setPlan(`${boss.id}_${boss.locations[0].id}`)
									}
								/>

								{boss.schools ? (
									<SchoolRadioGroup {...boss} />
								) : (
									<ListBossLocations {...boss} />
								)}
							</div>
						);
					}

					return (
						<div
							key={boss.id}
							className='text-center mr-6 mb-6 text-3xl rounded-xl bg-bir-red w-full sm:aspect-[4/3]'
						>
							<RadioGroupOption {...boss} location={boss.locations[0]}>
								{boss.name}
							</RadioGroupOption>
						</div>
					);
				})}
			</div>

			{/* <RadioGroup.Option value='startup'>
				{({ checked }) => (
					<span className={checked ? "bg-blue-200" : ""}>Startup</span>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value='business'>
				{({ checked }) => (
					<span className={checked ? "bg-blue-200" : ""}>Business</span>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value='enterprise'>
				{({ checked }) => (
					<span className={checked ? "bg-blue-200" : ""}>Enterprise</span>
				)}
			</RadioGroup.Option> */}
		</RadioGroup>
	);
}

function CheckIcon(props) {
	return (
		<svg viewBox='0 0 24 24' fill='none' {...props}>
			<circle cx={12} cy={12} r={12} fill='#fff' opacity='0.2' />
			<path
				d='M7 13l3 3 7-7'
				stroke='#fff'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
