type Address = { address: string; city: string };

type PresentDeliveryList<TObject extends object> = {
	[k in keyof TObject]: Address
};
