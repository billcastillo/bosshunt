import { SITE_TITLE } from "../config";
import Image from "next/image";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import GlobalModal from "./GlobalModal";

/**
 * TODO:
 * - add headlessUI dialog
 * https://headlessui.com/react/radio-group
 */

export default function Header() {
	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<header className='relative bg-bir-dark border-b-8 border-bir-red'>
			{/* <div className='w-[500px] aspect-square bg-pattern-bir bg-repeat'></div>
			<div className='w-[500px] aspect-square bg-pattern-1 bg-repeat'></div> */}
			<div className='px-4 sm:px-8 py-4 container mx-auto flex justify-between'>
				<nav className='w-full'>
					<ul className='flex justify-between font-bebas'>
						<li>
							<Link href='./'>
								<h1 className='flex content-center items-center leading-none mr-8 text-3xl'>
									<span className='relative mr-4 top-[1px]'>
										<span className='uppercase'>{SITE_TITLE}</span> by
									</span>
									<Image
										width='40'
										height='40'
										src='/logo/bir.svg'
										alt='bir gaming'
									/>
								</h1>
							</Link>
						</li>
						<li>
							<button className='uppercase text-3xl' onClick={openModal}>
								How to use
							</button>
						</li>
					</ul>
				</nav>
				<div></div>
			</div>

			<GlobalModal
				isOpen={isOpen}
				closeModal={closeModal}
				content={{
					title: "sample",
					description: "desc",
					closeButtonText: "ok got",
				}}
			/>
		</header>
	);
}
